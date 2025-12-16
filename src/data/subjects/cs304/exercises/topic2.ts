import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'cs304-t2-ex01',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'Simple Recursive Descent Parser',
    difficulty: 2,
    description: 'Implement a recursive descent parser for arithmetic expressions with addition and multiplication following the grammar: E → T + E | T, T → num.',
    starterCode: `class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0

    def peek(self):
        return self.tokens[self.pos] if self.pos < len(self.tokens) else None

    def consume(self, expected_type):
        """Consume and return token if it matches expected type"""
        # Your code here
        pass

    def parse_expression(self):
        """E → T + E | T"""
        # Your code here
        pass

    def parse_term(self):
        """T → num"""
        # Your code here
        pass

# Test
tokens = [('NUMBER', 5), ('PLUS', '+'), ('NUMBER', 3)]
parser = Parser(tokens)
result = parser.parse_expression()
print(result)`,
    solution: `class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0

    def peek(self):
        return self.tokens[self.pos] if self.pos < len(self.tokens) else None

    def consume(self, expected_type):
        """Consume and return token if it matches expected type"""
        token = self.peek()
        if not token or token[0] != expected_type:
            raise SyntaxError(f"Expected {expected_type}, got {token}")
        self.pos += 1
        return token

    def parse_expression(self):
        """E → T + E | T"""
        left = self.parse_term()

        if self.peek() and self.peek()[0] == 'PLUS':
            self.consume('PLUS')
            right = self.parse_expression()
            return ('ADD', left, right)

        return left

    def parse_term(self):
        """T → num"""
        token = self.consume('NUMBER')
        return ('NUM', token[1])

# Test
tokens = [('NUMBER', 5), ('PLUS', '+'), ('NUMBER', 3)]
parser = Parser(tokens)
result = parser.parse_expression()
print(result)`,
    testCases: [
      { input: "[('NUMBER', 5)]", expectedOutput: "('NUM', 5)", isHidden: false, description: 'Single number' },
      { input: "[('NUMBER', 5), ('PLUS', '+'), ('NUMBER', 3)]", expectedOutput: "('ADD', ('NUM', 5), ('NUM', 3))", isHidden: false, description: 'Simple addition' },
      { input: "[('NUMBER', 1), ('PLUS', '+'), ('NUMBER', 2), ('PLUS', '+'), ('NUMBER', 3)]", expectedOutput: "nested ADD", isHidden: true, description: 'Right-associative addition chain' }
    ],
    hints: [
      'Each grammar rule becomes a parsing method',
      'Use peek() to look ahead without consuming',
      'Consume tokens that match the expected type',
      'Return parse tree nodes as tuples'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex02',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'Grammar Ambiguity Detection',
    difficulty: 3,
    description: 'Implement a function that detects if a grammar is ambiguous by checking for conflicts in a simple case (multiple derivations for the same string).',
    starterCode: `def is_ambiguous_grammar(grammar, test_strings):
    """
    Check if grammar produces multiple parse trees for any test string.
    grammar: dict of production rules
    test_strings: list of strings to test
    Return True if any string has multiple derivations.
    """
    # Your code here
    pass

# Test
grammar = {
    'E': [['E', '+', 'E'], ['E', '*', 'E'], ['num']]
}
print(is_ambiguous_grammar(grammar, ['num+num*num']))`,
    solution: `def is_ambiguous_grammar(grammar, test_strings):
    """
    Check if grammar produces multiple parse trees for any test string.
    This is a simplified version that checks for the classic ambiguity pattern.
    """
    # Check for ambiguous patterns in the grammar itself
    def has_ambiguous_operators(productions):
        """Check if grammar has operators at same precedence level"""
        operators = []
        for prod in productions:
            if len(prod) == 3 and prod[0] == prod[2]:  # E → E op E
                operators.append(prod[1])
        # If multiple operators exist with same recursive pattern, likely ambiguous
        return len(operators) > 1

    # Simple heuristic: if we have E → E + E | E * E, it's ambiguous
    for nonterminal, productions in grammar.items():
        if has_ambiguous_operators(productions):
            return True

    return False

# More sophisticated version using CYK-style parsing
def is_ambiguous_grammar_advanced(grammar, test_strings):
    """
    Actually parse test strings and count derivations.
    This is computationally expensive but more accurate.
    """
    def count_parse_trees(string, symbol, memo=None):
        if memo is None:
            memo = {}

        if (string, symbol) in memo:
            return memo[(string, symbol)]

        if symbol not in grammar:
            # Terminal
            count = 1 if string == symbol else 0
            memo[(string, symbol)] = count
            return count

        total = 0
        for production in grammar[symbol]:
            if len(production) == 1:
                # E → num
                total += count_parse_trees(string, production[0], memo)
            elif len(production) == 3:
                # E → E + E - try all splits
                for i in range(len(string)):
                    left = string[:i]
                    right = string[i+1:]
                    if i < len(string) and string[i] == production[1]:
                        left_count = count_parse_trees(left, production[0], memo)
                        right_count = count_parse_trees(right, production[2], memo)
                        total += left_count * right_count

        memo[(string, symbol)] = total
        return total

    for test_str in test_strings:
        if count_parse_trees(test_str, 'E') > 1:
            return True

    return False

# Test
grammar = {
    'E': [['E', '+', 'E'], ['E', '*', 'E'], ['num']]
}
print(is_ambiguous_grammar(grammar, ['num+num*num']))`,
    testCases: [
      { input: "grammar1", expectedOutput: 'True', isHidden: false, description: 'Ambiguous arithmetic grammar' },
      { input: "grammar2", expectedOutput: 'False', isHidden: true, description: 'Unambiguous grammar with precedence' }
    ],
    hints: [
      'A grammar is ambiguous if one string has multiple parse trees',
      'Look for patterns like E → E + E | E * E (same precedence)',
      'You can check heuristically or actually parse test strings',
      'This is undecidable in general, so use approximations'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex03',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'First and Follow Sets',
    difficulty: 3,
    description: 'Compute FIRST and FOLLOW sets for a context-free grammar, used in LL parsing.',
    starterCode: `def compute_first_sets(grammar):
    """
    Compute FIRST sets for each nonterminal.
    grammar: dict {nonterminal: [[production], ...]}
    Return: dict {symbol: set of terminals}
    """
    # Your code here
    pass

def compute_follow_sets(grammar, start_symbol):
    """
    Compute FOLLOW sets for each nonterminal.
    Return: dict {nonterminal: set of terminals}
    """
    # Your code here
    pass

# Test
grammar = {
    'S': [['A', 'B']],
    'A': [['a'], ['ε']],
    'B': [['b']]
}
print(compute_first_sets(grammar))
print(compute_follow_sets(grammar, 'S'))`,
    solution: `def compute_first_sets(grammar):
    """
    Compute FIRST sets for each nonterminal.
    grammar: dict {nonterminal: [[production], ...]}
    Return: dict {symbol: set of terminals}
    """
    first = {nt: set() for nt in grammar}

    # Terminals have themselves in FIRST
    all_symbols = set()
    for productions in grammar.values():
        for prod in productions:
            all_symbols.update(prod)

    terminals = all_symbols - set(grammar.keys())

    changed = True
    while changed:
        changed = False
        for nonterminal in grammar:
            for production in grammar[nonterminal]:
                # Empty production
                if production == ['ε']:
                    if 'ε' not in first[nonterminal]:
                        first[nonterminal].add('ε')
                        changed = True
                    continue

                # Process symbols in production
                for symbol in production:
                    if symbol in terminals:
                        if symbol not in first[nonterminal]:
                            first[nonterminal].add(symbol)
                            changed = True
                        break
                    else:
                        # Nonterminal
                        before = len(first[nonterminal])
                        first[nonterminal].update(first[symbol] - {'ε'})
                        if len(first[nonterminal]) > before:
                            changed = True

                        if 'ε' not in first[symbol]:
                            break
                else:
                    # All symbols can derive epsilon
                    if 'ε' not in first[nonterminal]:
                        first[nonterminal].add('ε')
                        changed = True

    return first

def compute_follow_sets(grammar, start_symbol):
    """
    Compute FOLLOW sets for each nonterminal.
    Return: dict {nonterminal: set of terminals}
    """
    first = compute_first_sets(grammar)
    follow = {nt: set() for nt in grammar}
    follow[start_symbol].add('$')  # End marker

    changed = True
    while changed:
        changed = False
        for nonterminal in grammar:
            for production in grammar[nonterminal]:
                for i, symbol in enumerate(production):
                    if symbol not in grammar:
                        continue  # Terminal

                    # Everything after symbol
                    rest = production[i+1:]

                    if not rest:
                        # Symbol is last - add FOLLOW(nonterminal)
                        before = len(follow[symbol])
                        follow[symbol].update(follow[nonterminal])
                        if len(follow[symbol]) > before:
                            changed = True
                    else:
                        # Add FIRST(rest) to FOLLOW(symbol)
                        for next_symbol in rest:
                            if next_symbol in grammar:
                                before = len(follow[symbol])
                                follow[symbol].update(first[next_symbol] - {'ε'})
                                if len(follow[symbol]) > before:
                                    changed = True
                                if 'ε' not in first[next_symbol]:
                                    break
                            else:
                                # Terminal
                                if next_symbol not in follow[symbol]:
                                    follow[symbol].add(next_symbol)
                                    changed = True
                                break
                        else:
                            # All symbols in rest can derive epsilon
                            before = len(follow[symbol])
                            follow[symbol].update(follow[nonterminal])
                            if len(follow[symbol]) > before:
                                changed = True

    return follow

# Test
grammar = {
    'S': [['A', 'B']],
    'A': [['a'], ['ε']],
    'B': [['b']]
}
print(compute_first_sets(grammar))
print(compute_follow_sets(grammar, 'S'))`,
    testCases: [
      { input: 'grammar1', expectedOutput: "FIRST(A) = {a, ε}, FIRST(B) = {b}", isHidden: false, description: 'Simple grammar' },
      { input: 'grammar2', expectedOutput: "FOLLOW(A) = {b}", isHidden: true, description: 'Follow set computation' }
    ],
    hints: [
      'FIRST(X) is the set of terminals that can start strings derived from X',
      'If X → ε, then ε ∈ FIRST(X)',
      'FOLLOW(X) is the set of terminals that can appear after X',
      'Use fixed-point iteration until sets stop growing'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex04',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'LL(1) Parse Table Construction',
    difficulty: 4,
    description: 'Build an LL(1) parse table from a grammar using FIRST and FOLLOW sets.',
    starterCode: `def build_ll1_table(grammar, start_symbol):
    """
    Build LL(1) parsing table.
    Return: dict {(nonterminal, terminal): production}
    """
    # Your code here
    pass

# Test
grammar = {
    'E': [['T', 'E_prime']],
    'E_prime': [['PLUS', 'T', 'E_prime'], ['ε']],
    'T': [['num']]
}
table = build_ll1_table(grammar, 'E')
print(table[('E', 'num')])  # Should be ['T', 'E_prime']`,
    solution: `def compute_first_sets(grammar):
    """Compute FIRST sets"""
    first = {nt: set() for nt in grammar}
    all_symbols = set()
    for productions in grammar.values():
        for prod in productions:
            all_symbols.update(prod)
    terminals = all_symbols - set(grammar.keys())

    changed = True
    while changed:
        changed = False
        for nonterminal in grammar:
            for production in grammar[nonterminal]:
                if production == ['ε']:
                    if 'ε' not in first[nonterminal]:
                        first[nonterminal].add('ε')
                        changed = True
                    continue

                for symbol in production:
                    if symbol in terminals:
                        if symbol not in first[nonterminal]:
                            first[nonterminal].add(symbol)
                            changed = True
                        break
                    else:
                        before = len(first[nonterminal])
                        first[nonterminal].update(first[symbol] - {'ε'})
                        if len(first[nonterminal]) > before:
                            changed = True
                        if 'ε' not in first[symbol]:
                            break
                else:
                    if 'ε' not in first[nonterminal]:
                        first[nonterminal].add('ε')
                        changed = True
    return first

def compute_follow_sets(grammar, start_symbol):
    """Compute FOLLOW sets"""
    first = compute_first_sets(grammar)
    follow = {nt: set() for nt in grammar}
    follow[start_symbol].add('$')

    changed = True
    while changed:
        changed = False
        for nonterminal in grammar:
            for production in grammar[nonterminal]:
                for i, symbol in enumerate(production):
                    if symbol not in grammar:
                        continue
                    rest = production[i+1:]
                    if not rest:
                        before = len(follow[symbol])
                        follow[symbol].update(follow[nonterminal])
                        if len(follow[symbol]) > before:
                            changed = True
                    else:
                        for next_symbol in rest:
                            if next_symbol in grammar:
                                before = len(follow[symbol])
                                follow[symbol].update(first[next_symbol] - {'ε'})
                                if len(follow[symbol]) > before:
                                    changed = True
                                if 'ε' not in first[next_symbol]:
                                    break
                            else:
                                if next_symbol not in follow[symbol]:
                                    follow[symbol].add(next_symbol)
                                    changed = True
                                break
                        else:
                            before = len(follow[symbol])
                            follow[symbol].update(follow[nonterminal])
                            if len(follow[symbol]) > before:
                                changed = True
    return follow

def build_ll1_table(grammar, start_symbol):
    """
    Build LL(1) parsing table.
    Return: dict {(nonterminal, terminal): production}
    """
    first = compute_first_sets(grammar)
    follow = compute_follow_sets(grammar, start_symbol)
    table = {}

    for nonterminal in grammar:
        for production in grammar[nonterminal]:
            # Compute FIRST of production
            prod_first = set()

            if production == ['ε']:
                prod_first.add('ε')
            else:
                for symbol in production:
                    if symbol not in grammar:
                        prod_first.add(symbol)
                        break
                    else:
                        prod_first.update(first[symbol] - {'ε'})
                        if 'ε' not in first[symbol]:
                            break
                else:
                    prod_first.add('ε')

            # For each terminal in FIRST(production)
            for terminal in prod_first - {'ε'}:
                if (nonterminal, terminal) in table:
                    raise ValueError(f"Grammar is not LL(1): conflict at ({nonterminal}, {terminal})")
                table[(nonterminal, terminal)] = production

            # If epsilon in FIRST(production), add for FOLLOW terminals
            if 'ε' in prod_first:
                for terminal in follow[nonterminal]:
                    if (nonterminal, terminal) in table:
                        raise ValueError(f"Grammar is not LL(1): conflict at ({nonterminal}, {terminal})")
                    table[(nonterminal, terminal)] = production

    return table

# Test
grammar = {
    'E': [['T', 'E_prime']],
    'E_prime': [['PLUS', 'T', 'E_prime'], ['ε']],
    'T': [['num']]
}
table = build_ll1_table(grammar, 'E')
print(table[('E', 'num')])  # Should be ['T', 'E_prime']`,
    testCases: [
      { input: 'grammar1', expectedOutput: "['T', 'E_prime']", isHidden: false, description: 'LL(1) table entry for E' },
      { input: 'grammar2', expectedOutput: "['ε']", isHidden: true, description: 'Epsilon production in table' }
    ],
    hints: [
      'For production A → α, add it to table[A, t] for each t in FIRST(α)',
      'If ε ∈ FIRST(α), also add it for each t in FOLLOW(A)',
      'If any table entry has multiple productions, grammar is not LL(1)',
      'Use FIRST and FOLLOW sets computed earlier'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex05',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'Table-Driven LL(1) Parser',
    difficulty: 3,
    description: 'Implement a table-driven LL(1) parser using a parse table and stack.',
    starterCode: `def ll1_parse(grammar, parse_table, start_symbol, tokens):
    """
    Parse tokens using LL(1) parse table.
    Return parse tree or raise SyntaxError.
    tokens: list ending with '$'
    """
    # Your code here
    pass

# Test
grammar = {
    'E': [['T', 'E_prime']],
    'E_prime': [['PLUS', 'T', 'E_prime'], ['ε']],
    'T': [['num']]
}
table = {
    ('E', 'num'): ['T', 'E_prime'],
    ('E_prime', 'PLUS'): ['PLUS', 'T', 'E_prime'],
    ('E_prime', '$'): ['ε'],
    ('T', 'num'): ['num']
}
tokens = ['num', 'PLUS', 'num', '$']
tree = ll1_parse(grammar, table, 'E', tokens)
print(tree)`,
    solution: `def ll1_parse(grammar, parse_table, start_symbol, tokens):
    """
    Parse tokens using LL(1) parse table.
    Return parse tree or raise SyntaxError.
    """
    stack = ['$', start_symbol]
    token_idx = 0
    parse_tree = {start_symbol: []}

    while stack:
        top = stack.pop()
        current_token = tokens[token_idx] if token_idx < len(tokens) else '$'

        if top == '$':
            if current_token == '$':
                return parse_tree
            else:
                raise SyntaxError("Unexpected tokens at end")

        elif top == 'ε':
            # Epsilon, skip
            continue

        elif top not in grammar:
            # Terminal
            if top == current_token:
                token_idx += 1
            else:
                raise SyntaxError(f"Expected {top}, got {current_token}")

        else:
            # Nonterminal - use parse table
            if (top, current_token) not in parse_table:
                raise SyntaxError(f"No parse table entry for ({top}, {current_token})")

            production = parse_table[(top, current_token)]

            # Push production in reverse order
            for symbol in reversed(production):
                if symbol != 'ε':
                    stack.append(symbol)

    if token_idx < len(tokens) - 1:
        raise SyntaxError("Not all tokens consumed")

    return "Accepted"

# More sophisticated version with tree building
def ll1_parse_with_tree(grammar, parse_table, start_symbol, tokens):
    """Parse and build explicit tree structure"""
    stack = [('$', None), (start_symbol, None)]
    token_idx = 0
    nodes = {}
    node_id = 0

    def make_node(symbol):
        nonlocal node_id
        nid = node_id
        node_id += 1
        nodes[nid] = {'symbol': symbol, 'children': []}
        return nid

    root_id = make_node(start_symbol)
    stack = [('$', None), (start_symbol, root_id)]

    while stack:
        top, parent_id = stack.pop()
        current_token = tokens[token_idx] if token_idx < len(tokens) else '$'

        if top == '$':
            if current_token == '$':
                return nodes[root_id]
            else:
                raise SyntaxError("Unexpected tokens at end")

        elif top == 'ε':
            continue

        elif top not in grammar:
            # Terminal
            if top == current_token:
                child_id = make_node(top)
                nodes[parent_id]['children'].append(child_id)
                token_idx += 1
            else:
                raise SyntaxError(f"Expected {top}, got {current_token}")

        else:
            # Nonterminal
            if (top, current_token) not in parse_table:
                raise SyntaxError(f"No parse table entry for ({top}, {current_token})")

            production = parse_table[(top, current_token)]

            # Create children and push onto stack
            child_ids = []
            for symbol in production:
                if symbol != 'ε':
                    child_id = make_node(symbol)
                    child_ids.append(child_id)

            nodes[parent_id]['children'] = child_ids

            for symbol, cid in zip(reversed(production), reversed(child_ids)):
                if symbol != 'ε':
                    stack.append((symbol, cid))

    return nodes[root_id]

# Test
grammar = {
    'E': [['T', 'E_prime']],
    'E_prime': [['PLUS', 'T', 'E_prime'], ['ε']],
    'T': [['num']]
}
table = {
    ('E', 'num'): ['T', 'E_prime'],
    ('E_prime', 'PLUS'): ['PLUS', 'T', 'E_prime'],
    ('E_prime', '$'): ['ε'],
    ('T', 'num'): ['num']
}
tokens = ['num', 'PLUS', 'num', '$']
tree = ll1_parse(grammar, table, 'E', tokens)
print(tree)`,
    testCases: [
      { input: "['num', '$']", expectedOutput: 'Accepted', isHidden: false, description: 'Single number' },
      { input: "['num', 'PLUS', 'num', '$']", expectedOutput: 'Accepted', isHidden: false, description: 'Addition expression' },
      { input: "['num', 'num', '$']", expectedOutput: 'SyntaxError', isHidden: true, description: 'Invalid syntax' }
    ],
    hints: [
      'Use a stack initialized with [$, start_symbol]',
      'Match terminals, expand nonterminals using table',
      'Pop from stack and compare with current input token',
      'Accept when stack is $ and input is $'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex06',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'LR(0) Items and Closures',
    difficulty: 4,
    description: 'Compute the closure of LR(0) items, used in LR parser construction.',
    starterCode: `def lr0_closure(items, grammar):
    """
    Compute closure of LR(0) items.
    items: set of (production, dot_position) tuples
    grammar: dict {nonterminal: [[production], ...]}
    Return: set of items in closure
    """
    # Your code here
    pass

# Test
grammar = {
    "S'": [['E']],
    'E': [['E', '+', 'T'], ['T']],
    'T': [['num']]
}
items = {("S'", ('E',), 0)}  # S' → •E
closure = lr0_closure(items, grammar)
print(closure)`,
    solution: `def lr0_closure(items, grammar):
    """
    Compute closure of LR(0) items.
    items: set of (nonterminal, production, dot_position) tuples
    grammar: dict {nonterminal: [[production], ...]}
    Return: set of items in closure
    """
    closure = set(items)
    changed = True

    while changed:
        changed = False
        new_items = set()

        for nonterminal, production, dot in closure:
            # If dot is before a nonterminal
            if dot < len(production):
                next_symbol = production[dot]

                if next_symbol in grammar:
                    # Add all productions of next_symbol with dot at start
                    for prod in grammar[next_symbol]:
                        item = (next_symbol, tuple(prod), 0)
                        if item not in closure:
                            new_items.add(item)
                            changed = True

        closure.update(new_items)

    return closure

# Test
grammar = {
    "S'": [['E']],
    'E': [['E', '+', 'T'], ['T']],
    'T': [['num']]
}
items = {("S'", ('E',), 0)}  # S' → •E
closure = lr0_closure(items, grammar)
print(closure)`,
    testCases: [
      { input: 'items1', expectedOutput: "Contains E → •E + T, E → •T, T → •num", isHidden: false, description: 'Closure of start item' },
      { input: 'items2', expectedOutput: 'Only original items', isHidden: true, description: 'Closure with no additions' }
    ],
    hints: [
      'An LR(0) item is a production with a dot marking position',
      'Closure adds items for nonterminals after the dot',
      'If A → α•Bβ is in closure, add B → •γ for all B productions',
      'Iterate until no new items are added'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex07',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'LR(0) GOTO Function',
    difficulty: 4,
    description: 'Implement the GOTO function that computes the next state in LR parsing.',
    starterCode: `def lr0_goto(items, symbol, grammar):
    """
    Compute GOTO(items, symbol) for LR(0) parsing.
    Move dot over symbol and compute closure.
    items: set of (nonterminal, production, dot) items
    symbol: grammar symbol to process
    Return: set of items
    """
    # Your code here
    pass

# Test
grammar = {
    'E': [['E', '+', 'T'], ['T']],
    'T': [['num']]
}
items = {('E', ('E', '+', 'T'), 0), ('E', ('T',), 0)}
goto_result = lr0_goto(items, 'T', grammar)
print(goto_result)`,
    solution: `def lr0_closure(items, grammar):
    """Compute closure of LR(0) items"""
    closure = set(items)
    changed = True

    while changed:
        changed = False
        new_items = set()

        for nonterminal, production, dot in closure:
            if dot < len(production):
                next_symbol = production[dot]
                if next_symbol in grammar:
                    for prod in grammar[next_symbol]:
                        item = (next_symbol, tuple(prod), 0)
                        if item not in closure:
                            new_items.add(item)
                            changed = True

        closure.update(new_items)

    return closure

def lr0_goto(items, symbol, grammar):
    """
    Compute GOTO(items, symbol) for LR(0) parsing.
    Move dot over symbol and compute closure.
    """
    # Find items with dot before symbol
    moved_items = set()

    for nonterminal, production, dot in items:
        if dot < len(production) and production[dot] == symbol:
            # Move dot one position
            moved_items.add((nonterminal, production, dot + 1))

    # Compute closure of moved items
    if moved_items:
        return lr0_closure(moved_items, grammar)
    else:
        return set()

# Test
grammar = {
    'E': [['E', '+', 'T'], ['T']],
    'T': [['num']]
}
items = {('E', ('E', '+', 'T'), 0), ('E', ('T',), 0)}
goto_result = lr0_goto(items, 'T', grammar)
print(goto_result)`,
    testCases: [
      { input: "(items, 'T')", expectedOutput: "{('E', ('T',), 1)}", isHidden: false, description: 'GOTO on T' },
      { input: "(items, 'E')", expectedOutput: "{('E', ('E', '+', 'T'), 1)}", isHidden: true, description: 'GOTO on E' }
    ],
    hints: [
      'GOTO(I, X) moves the dot over symbol X',
      'For each item A → α•Xβ, create A → αX•β',
      'Then compute closure of the resulting items',
      'Return empty set if no items have X after the dot'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex08',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'SLR Parse Table Construction',
    difficulty: 5,
    description: 'Build an SLR(1) parse table with shift, reduce, and accept actions.',
    starterCode: `def build_slr_table(grammar, start_symbol):
    """
    Build SLR(1) parsing table.
    Return: (action_table, goto_table, states)
    action_table: {(state, terminal): ('shift', next_state) | ('reduce', production) | 'accept'}
    goto_table: {(state, nonterminal): next_state}
    """
    # Your code here
    pass

# Test
grammar = {
    "S'": [['E']],
    'E': [['E', '+', 'n'], ['n']]
}
action, goto, states = build_slr_table(grammar, "S'")
print(f"Number of states: {len(states)}")`,
    solution: `def compute_follow_sets(grammar, start_symbol):
    """Compute FOLLOW sets for SLR"""
    # Simplified version
    follow = {nt: set() for nt in grammar}
    follow[start_symbol].add('$')

    changed = True
    while changed:
        changed = False
        for nt in grammar:
            for prod in grammar[nt]:
                for i, symbol in enumerate(prod):
                    if symbol not in grammar:
                        continue
                    # Add what follows symbol
                    if i + 1 < len(prod):
                        next_sym = prod[i + 1]
                        if next_sym not in grammar:
                            if next_sym not in follow[symbol]:
                                follow[symbol].add(next_sym)
                                changed = True
                    else:
                        # Symbol is last
                        before = len(follow[symbol])
                        follow[symbol].update(follow[nt])
                        if len(follow[symbol]) > before:
                            changed = True
    return follow

def lr0_closure(items, grammar):
    """Compute closure"""
    closure = set(items)
    changed = True
    while changed:
        changed = False
        new_items = set()
        for nonterminal, production, dot in closure:
            if dot < len(production):
                next_symbol = production[dot]
                if next_symbol in grammar:
                    for prod in grammar[next_symbol]:
                        item = (next_symbol, tuple(prod), 0)
                        if item not in closure:
                            new_items.add(item)
                            changed = True
        closure.update(new_items)
    return closure

def lr0_goto(items, symbol, grammar):
    """Compute GOTO"""
    moved_items = set()
    for nonterminal, production, dot in items:
        if dot < len(production) and production[dot] == symbol:
            moved_items.add((nonterminal, production, dot + 1))
    if moved_items:
        return lr0_closure(moved_items, grammar)
    return set()

def build_slr_table(grammar, start_symbol):
    """Build SLR(1) parsing table"""
    # Get all symbols
    all_symbols = set()
    for prods in grammar.values():
        for prod in prods:
            all_symbols.update(prod)

    terminals = (all_symbols - set(grammar.keys())) | {'$'}
    nonterminals = set(grammar.keys())

    # Build canonical collection of LR(0) items
    start_items = lr0_closure({(start_symbol, tuple(grammar[start_symbol][0]), 0)}, grammar)
    states = [start_items]
    state_map = {frozenset(start_items): 0}
    unmarked = [0]

    while unmarked:
        state_id = unmarked.pop()
        items = states[state_id]

        for symbol in all_symbols | nonterminals:
            goto_items = lr0_goto(items, symbol, grammar)
            if goto_items:
                goto_frozen = frozenset(goto_items)
                if goto_frozen not in state_map:
                    state_map[goto_frozen] = len(states)
                    states.append(goto_items)
                    unmarked.append(len(states) - 1)

    # Build ACTION and GOTO tables
    action = {}
    goto = {}
    follow = compute_follow_sets(grammar, start_symbol)

    for state_id, items in enumerate(states):
        for nt, prod, dot in items:
            if dot < len(prod):
                next_symbol = prod[dot]
                goto_items = lr0_goto(items, next_symbol, grammar)
                if goto_items:
                    goto_frozen = frozenset(goto_items)
                    next_state = state_map[goto_frozen]

                    if next_symbol in terminals:
                        # Shift
                        action[(state_id, next_symbol)] = ('shift', next_state)
                    elif next_symbol in nonterminals:
                        # GOTO
                        goto[(state_id, next_symbol)] = next_state
            else:
                # Reduce item
                if nt == start_symbol:
                    # Accept
                    action[(state_id, '$')] = 'accept'
                else:
                    # Reduce by production
                    for terminal in follow[nt]:
                        action[(state_id, terminal)] = ('reduce', (nt, prod))

    return action, goto, states

# Test
grammar = {
    "S'": [['E']],
    'E': [['E', '+', 'n'], ['n']]
}
action, goto, states = build_slr_table(grammar, "S'")
print(f"Number of states: {len(states)}")`,
    testCases: [
      { input: 'grammar1', expectedOutput: '5 states', isHidden: false, description: 'Simple expression grammar' },
      { input: 'grammar2', expectedOutput: 'Valid SLR table', isHidden: true, description: 'More complex grammar' }
    ],
    hints: [
      'Build canonical collection of LR(0) item sets',
      'For items with dot before terminal, add shift actions',
      'For complete items A → α•, add reduce for terminals in FOLLOW(A)',
      'GOTO table handles nonterminal transitions',
      'Detect conflicts: multiple actions for same (state, symbol)'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex09',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'Shift-Reduce Parser',
    difficulty: 4,
    description: 'Implement a shift-reduce parser using an SLR parse table.',
    starterCode: `def shift_reduce_parse(action_table, goto_table, tokens):
    """
    Parse tokens using shift-reduce parsing.
    tokens: list ending with '$'
    Return: list of parse actions taken
    """
    # Your code here
    pass

# Test
action = {
    (0, 'n'): ('shift', 2),
    (0, '$'): ('reduce', ('E', ('n',))),
    (2, '$'): ('reduce', ('E', ('n',))),
    (1, '$'): 'accept'
}
goto = {(0, 'E'): 1}
tokens = ['n', '$']
actions = shift_reduce_parse(action, goto, tokens)
print(actions)`,
    solution: `def shift_reduce_parse(action_table, goto_table, tokens):
    """
    Parse tokens using shift-reduce parsing.
    tokens: list ending with '$'
    Return: list of parse actions taken
    """
    stack = [0]  # State stack
    symbol_stack = []  # Symbol stack
    token_idx = 0
    actions_taken = []

    while True:
        state = stack[-1]
        token = tokens[token_idx]

        if (state, token) not in action_table:
            raise SyntaxError(f"No action for state {state}, token {token}")

        action = action_table[(state, token)]

        if action == 'accept':
            actions_taken.append('accept')
            return actions_taken

        elif action[0] == 'shift':
            next_state = action[1]
            actions_taken.append(f"shift {token} to state {next_state}")
            stack.append(next_state)
            symbol_stack.append(token)
            token_idx += 1

        elif action[0] == 'reduce':
            nonterminal, production = action[1]
            actions_taken.append(f"reduce by {nonterminal} → {' '.join(production)}")

            # Pop production length from stacks
            prod_len = len(production)
            for _ in range(prod_len):
                stack.pop()
                if symbol_stack:
                    symbol_stack.pop()

            # Push nonterminal
            symbol_stack.append(nonterminal)

            # GOTO
            state = stack[-1]
            if (state, nonterminal) not in goto_table:
                raise SyntaxError(f"No GOTO for state {state}, nonterminal {nonterminal}")

            next_state = goto_table[(state, nonterminal)]
            stack.append(next_state)

        else:
            raise SyntaxError(f"Unknown action: {action}")

# Test
action = {
    (0, 'n'): ('shift', 2),
    (2, '$'): ('reduce', ('E', ('n',))),
    (1, '$'): 'accept',
    (0, 'E'): None  # This would be in goto table
}
goto = {(0, 'E'): 1}
tokens = ['n', '$']
actions = shift_reduce_parse(action, goto, tokens)
print(actions)`,
    testCases: [
      { input: "['n', '$']", expectedOutput: "['shift', 'reduce', 'accept']", isHidden: false, description: 'Parse single number' },
      { input: "['n', '+', 'n', '$']", expectedOutput: "shift/reduce sequence", isHidden: true, description: 'Parse addition' }
    ],
    hints: [
      'Maintain two stacks: state stack and symbol stack',
      'Shift: push token and next state',
      'Reduce: pop production length, push nonterminal, use GOTO',
      'Accept: when reaching accept action',
      'Handle errors when no action exists'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex10',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'Parse Tree Construction',
    difficulty: 3,
    description: 'Build an explicit parse tree data structure during recursive descent parsing.',
    starterCode: `class ParseNode:
    def __init__(self, symbol, children=None):
        self.symbol = symbol
        self.children = children or []

    def __repr__(self):
        return f"ParseNode({self.symbol}, {self.children})"

class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0

    def parse(self):
        """Parse and return parse tree"""
        # Your code here
        pass

# Test
tokens = [('NUMBER', 5), ('PLUS', '+'), ('NUMBER', 3)]
parser = Parser(tokens)
tree = parser.parse()
print(tree)`,
    solution: `class ParseNode:
    def __init__(self, symbol, children=None, value=None):
        self.symbol = symbol
        self.children = children or []
        self.value = value

    def __repr__(self, level=0):
        indent = "  " * level
        if self.children:
            children_repr = "\\n".join(c.__repr__(level + 1) for c in self.children)
            return f"{indent}{self.symbol}\\n{children_repr}"
        else:
            val = f"={self.value}" if self.value is not None else ""
            return f"{indent}{self.symbol}{val}"

class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0

    def peek(self):
        return self.tokens[self.pos] if self.pos < len(self.tokens) else None

    def consume(self, expected_type):
        token = self.peek()
        if not token or token[0] != expected_type:
            raise SyntaxError(f"Expected {expected_type}, got {token}")
        self.pos += 1
        return token

    def parse(self):
        """Parse and return parse tree for expression"""
        return self.parse_expression()

    def parse_expression(self):
        """E → T + E | T"""
        node = ParseNode('E')
        left = self.parse_term()
        node.children.append(left)

        if self.peek() and self.peek()[0] == 'PLUS':
            plus_token = self.consume('PLUS')
            plus_node = ParseNode('PLUS', value=plus_token[1])
            node.children.append(plus_node)

            right = self.parse_expression()
            node.children.append(right)

        return node

    def parse_term(self):
        """T → num"""
        token = self.consume('NUMBER')
        return ParseNode('NUMBER', value=token[1])

# Test
tokens = [('NUMBER', 5), ('PLUS', '+'), ('NUMBER', 3)]
parser = Parser(tokens)
tree = parser.parse()
print(tree)`,
    testCases: [
      { input: "[('NUMBER', 5)]", expectedOutput: 'Tree with single NUMBER node', isHidden: false, description: 'Single number tree' },
      { input: "[('NUMBER', 5), ('PLUS', '+'), ('NUMBER', 3)]", expectedOutput: 'Tree with E → NUMBER PLUS E structure', isHidden: false, description: 'Addition tree' },
      { input: "[('NUMBER', 1), ('PLUS', '+'), ('NUMBER', 2), ('PLUS', '+'), ('NUMBER', 3)]", expectedOutput: 'Right-associative tree', isHidden: true, description: 'Chain of additions' }
    ],
    hints: [
      'Create ParseNode objects for each grammar symbol',
      'Attach children when recursively parsing sub-expressions',
      'Store token values in leaf nodes',
      'Return the root node from each parsing method'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex11',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'Left Factoring',
    difficulty: 3,
    description: 'Transform a grammar by left factoring to eliminate common prefixes, making it suitable for LL parsing.',
    starterCode: `def left_factor(grammar):
    """
    Transform grammar by left factoring.
    grammar: dict {nonterminal: [[production], ...]}
    Return: transformed grammar
    """
    # Your code here
    pass

# Test
grammar = {
    'A': [['a', 'b'], ['a', 'c']]
}
factored = left_factor(grammar)
print(factored)  # Should factor out common 'a'`,
    solution: `def left_factor(grammar):
    """
    Transform grammar by left factoring.
    Finds common prefixes and factors them out.
    """
    new_grammar = {}
    suffix_counter = {}

    for nonterminal in grammar:
        productions = grammar[nonterminal]

        # Group productions by common prefix
        prefix_groups = {}

        for prod in productions:
            if not prod:
                continue

            # Find longest common prefix with other productions
            prefix = tuple([prod[0]])  # Start with first symbol

            # Could extend to find longer prefixes
            if prefix not in prefix_groups:
                prefix_groups[prefix] = []
            prefix_groups[prefix].append(prod)

        # Build new productions
        new_prods = []

        for prefix, group in prefix_groups.items():
            if len(group) > 1:
                # Need to factor
                # Create new nonterminal
                if nonterminal not in suffix_counter:
                    suffix_counter[nonterminal] = 0
                suffix_counter[nonterminal] += 1
                new_nt = f"{nonterminal}_prime{suffix_counter[nonterminal]}"

                # Add: A → prefix A'
                new_prods.append(list(prefix) + [new_nt])

                # Add: A' → suffix1 | suffix2 | ...
                new_grammar[new_nt] = []
                for prod in group:
                    suffix = prod[len(prefix):]
                    if not suffix:
                        suffix = ['ε']
                    new_grammar[new_nt].append(suffix)
            else:
                # No factoring needed
                new_prods.append(group[0])

        new_grammar[nonterminal] = new_prods

    return new_grammar

# More sophisticated version
def left_factor_advanced(grammar):
    """
    Left factor with longest common prefix detection.
    """
    def longest_common_prefix(prods):
        """Find longest common prefix among productions"""
        if not prods or len(prods) < 2:
            return []

        prefix = []
        min_len = min(len(p) for p in prods)

        for i in range(min_len):
            symbols = [p[i] for p in prods]
            if all(s == symbols[0] for s in symbols):
                prefix.append(symbols[0])
            else:
                break

        return prefix

    new_grammar = dict(grammar)
    changed = True
    counter = 0

    while changed:
        changed = False

        for nonterminal in list(new_grammar.keys()):
            productions = new_grammar[nonterminal]

            # Try to find productions with common prefix
            for i in range(len(productions)):
                for j in range(i + 1, len(productions)):
                    prefix = longest_common_prefix([productions[i], productions[j]])

                    if prefix:
                        # Found common prefix - factor it out
                        changed = True
                        counter += 1
                        new_nt = f"{nonterminal}_prime{counter}"

                        # Collect all productions with this prefix
                        with_prefix = []
                        without_prefix = []

                        for prod in productions:
                            if prod[:len(prefix)] == prefix:
                                with_prefix.append(prod)
                            else:
                                without_prefix.append(prod)

                        # Create new productions
                        new_grammar[nonterminal] = without_prefix + [prefix + [new_nt]]
                        new_grammar[new_nt] = []

                        for prod in with_prefix:
                            suffix = prod[len(prefix):]
                            if not suffix:
                                suffix = ['ε']
                            new_grammar[new_nt].append(suffix)

                        break
                if changed:
                    break
            if changed:
                break

    return new_grammar

# Test
grammar = {
    'A': [['a', 'b'], ['a', 'c']]
}
factored = left_factor(grammar)
print(factored)`,
    testCases: [
      { input: "{'A': [['a', 'b'], ['a', 'c']]}", expectedOutput: "A → a A', A' → b | c", isHidden: false, description: 'Simple left factoring' },
      { input: "{'S': [['if', 'expr', 'then', 'stmt'], ['if', 'expr', 'then', 'stmt', 'else', 'stmt']]}", expectedOutput: 'Factored if-then-else', isHidden: true, description: 'Dangling else factoring' }
    ],
    hints: [
      'Find productions with common prefixes',
      'Create a new nonterminal for the suffixes',
      'Replace A → αβ | αγ with A → αA\', A\' → β | γ',
      'May need to iterate until no more factoring is possible'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex12',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'Left Recursion Elimination',
    difficulty: 4,
    description: 'Eliminate left recursion from a grammar to make it suitable for top-down parsing.',
    starterCode: `def eliminate_left_recursion(grammar):
    """
    Eliminate immediate left recursion.
    Transform A → Aα | β into A → βA', A' → αA' | ε
    """
    # Your code here
    pass

# Test
grammar = {
    'E': [['E', '+', 'T'], ['T']]
}
transformed = eliminate_left_recursion(grammar)
print(transformed)`,
    solution: `def eliminate_left_recursion(grammar):
    """
    Eliminate immediate left recursion.
    Transform A → Aα | β into A → βA', A' → αA' | ε
    """
    new_grammar = {}

    for nonterminal in grammar:
        productions = grammar[nonterminal]

        # Separate into left-recursive and non-left-recursive
        left_recursive = []
        non_left_recursive = []

        for prod in productions:
            if prod and prod[0] == nonterminal:
                # Left recursive: A → Aα
                left_recursive.append(prod[1:])  # α
            else:
                # Not left recursive: A → β
                non_left_recursive.append(prod)

        if not left_recursive:
            # No left recursion
            new_grammar[nonterminal] = productions
        else:
            # Eliminate left recursion
            new_nt = f"{nonterminal}_prime"

            # A → βA' for each β
            new_grammar[nonterminal] = []
            for beta in non_left_recursive:
                new_grammar[nonterminal].append(beta + [new_nt])

            # A' → αA' | ε for each α
            new_grammar[new_nt] = []
            for alpha in left_recursive:
                new_grammar[new_nt].append(alpha + [new_nt])
            new_grammar[new_nt].append(['ε'])

    return new_grammar

# General left recursion elimination (handles indirect)
def eliminate_all_left_recursion(grammar):
    """
    Eliminate all left recursion including indirect.
    Uses the algorithm that orders nonterminals.
    """
    nonterminals = list(grammar.keys())
    new_grammar = dict(grammar)

    # Order nonterminals A1, A2, ..., An
    for i in range(len(nonterminals)):
        Ai = nonterminals[i]

        # Eliminate Ai → Aj γ where j < i
        for j in range(i):
            Aj = nonterminals[j]
            new_productions = []

            for prod in new_grammar[Ai]:
                if prod and prod[0] == Aj:
                    # Replace Ai → Aj γ with Ai → δ1 γ | δ2 γ | ...
                    # where Aj → δ1 | δ2 | ...
                    gamma = prod[1:]
                    for aj_prod in new_grammar[Aj]:
                        new_productions.append(aj_prod + gamma)
                else:
                    new_productions.append(prod)

            new_grammar[Ai] = new_productions

        # Eliminate immediate left recursion for Ai
        new_grammar = {**new_grammar, **eliminate_left_recursion({Ai: new_grammar[Ai]})}

    return new_grammar

# Test
grammar = {
    'E': [['E', '+', 'T'], ['T']]
}
transformed = eliminate_left_recursion(grammar)
print(transformed)`,
    testCases: [
      { input: "{'E': [['E', '+', 'T'], ['T']]}", expectedOutput: "E → T E', E' → + T E' | ε", isHidden: false, description: 'Immediate left recursion' },
      { input: "{'S': [['S', 'a'], ['b']]}", expectedOutput: "S → b S', S' → a S' | ε", isHidden: true, description: 'Simple left recursion' }
    ],
    hints: [
      'Separate productions into left-recursive (A → Aα) and others (A → β)',
      'Create new nonterminal A\'',
      'Replace with A → βA\' and A\' → αA\' | ε',
      'For indirect recursion, use substitution algorithm'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex13',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'Operator Precedence Parser',
    difficulty: 4,
    description: 'Implement an operator precedence parser using precedence relations between operators.',
    starterCode: `def precedence_parse(tokens, precedence):
    """
    Parse using operator precedence.
    precedence: dict {operator: level}, higher = higher precedence
    tokens: list of numbers and operators
    Return: parse tree
    """
    # Your code here
    pass

# Test
precedence = {'+': 1, '*': 2}
tokens = [5, '+', 3, '*', 2]
tree = precedence_parse(tokens, precedence)
print(tree)`,
    solution: `def precedence_parse(tokens, precedence):
    """
    Parse using operator precedence.
    Uses a simple precedence climbing algorithm.
    """
    def parse_expression(min_precedence):
        nonlocal pos

        # Parse left operand (number)
        if pos >= len(tokens) or not isinstance(tokens[pos], int):
            raise SyntaxError(f"Expected number at position {pos}")

        left = tokens[pos]
        pos += 1

        # Process operators
        while pos < len(tokens) and tokens[pos] in precedence:
            op = tokens[pos]
            op_precedence = precedence[op]

            if op_precedence < min_precedence:
                break

            pos += 1

            # Parse right operand with higher precedence
            right = parse_expression(op_precedence + 1)

            # Build tree node
            left = (op, left, right)

        return left

    pos = 0
    result = parse_expression(0)
    return result

# Alternative: Using stack-based operator precedence
def precedence_parse_stack(tokens, precedence):
    """
    Parse using stack-based operator precedence.
    """
    operand_stack = []
    operator_stack = []

    def apply_operator():
        if len(operand_stack) < 2:
            raise SyntaxError("Not enough operands")
        right = operand_stack.pop()
        left = operand_stack.pop()
        op = operator_stack.pop()
        operand_stack.append((op, left, right))

    i = 0
    while i < len(tokens):
        token = tokens[i]

        if isinstance(token, int):
            # Operand
            operand_stack.append(token)
        elif token in precedence:
            # Operator
            while (operator_stack and
                   operator_stack[-1] in precedence and
                   precedence[operator_stack[-1]] >= precedence[token]):
                apply_operator()

            operator_stack.append(token)
        else:
            raise SyntaxError(f"Unknown token: {token}")

        i += 1

    # Apply remaining operators
    while operator_stack:
        apply_operator()

    if len(operand_stack) != 1:
        raise SyntaxError("Invalid expression")

    return operand_stack[0]

# Test
precedence = {'+': 1, '*': 2}
tokens = [5, '+', 3, '*', 2]
tree = precedence_parse(tokens, precedence)
print(tree)`,
    testCases: [
      { input: '[5, "+", 3]', expectedOutput: '("+", 5, 3)', isHidden: false, description: 'Simple addition' },
      { input: '[5, "+", 3, "*", 2]', expectedOutput: '("+", 5, ("*", 3, 2))', isHidden: false, description: 'Precedence: multiplication before addition' },
      { input: '[2, "*", 3, "+", 4, "*", 5]', expectedOutput: '("+", ("*", 2, 3), ("*", 4, 5))', isHidden: true, description: 'Mixed precedence' }
    ],
    hints: [
      'Use precedence levels to decide when to reduce',
      'Higher precedence binds tighter',
      'Can use precedence climbing or stack-based approach',
      'Build tree nodes as you reduce operators'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex14',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'Abstract Syntax Tree (AST)',
    difficulty: 3,
    description: 'Convert a parse tree into an Abstract Syntax Tree by removing unnecessary nodes.',
    starterCode: `def parse_tree_to_ast(parse_tree):
    """
    Convert parse tree to AST.
    Remove intermediate nonterminals, keep only essential structure.
    parse_tree: nested tuple structure
    """
    # Your code here
    pass

# Test
parse_tree = ('E', ('T', ('num', 5)), ('+', '+'), ('E', ('T', ('num', 3))))
ast = parse_tree_to_ast(parse_tree)
print(ast)  # Should be simpler: ('+', 5, 3)`,
    solution: `def parse_tree_to_ast(parse_tree):
    """
    Convert parse tree to AST.
    Remove intermediate nonterminals, keep only essential structure.
    """
    if not isinstance(parse_tree, tuple):
        return parse_tree

    symbol = parse_tree[0]

    # If this is a leaf node with a value
    if len(parse_tree) == 2 and not isinstance(parse_tree[1], tuple):
        # Leaf node like ('num', 5)
        return parse_tree[1]

    # Process children
    children = [parse_tree_to_ast(child) for child in parse_tree[1:]]

    # Filter out None and non-essential nodes
    children = [c for c in children if c is not None]

    # Simplification rules
    if symbol in ['E', 'T', 'F', 'E_prime', 'T_prime']:
        # Intermediate nonterminals
        if len(children) == 1:
            # Single child - return it directly
            return children[0]
        elif len(children) == 3 and children[1] in ['+', '-', '*', '/']:
            # Binary operation: left op right
            return (children[1], children[0], children[2])
        elif len(children) == 2:
            # Could be unary or other structure
            if children[0] in ['+', '-', '*', '/']:
                # Operator followed by operand
                return (children[0], children[1])
            else:
                return children[1]

    # Operator nodes
    if symbol in ['+', '-', '*', '/', 'PLUS', 'MINUS', 'MULTIPLY', 'DIVIDE']:
        return symbol

    # Default: return simplified structure
    if len(children) == 1:
        return children[0]
    else:
        return (symbol, *children)

# More sophisticated version
class ASTNode:
    def __init__(self, type, value=None, children=None):
        self.type = type
        self.value = value
        self.children = children or []

    def __repr__(self):
        if self.value is not None:
            return f"AST({self.type}={self.value})"
        elif self.children:
            children_str = ", ".join(repr(c) for c in self.children)
            return f"AST({self.type}: {children_str})"
        else:
            return f"AST({self.type})"

def parse_tree_to_ast_nodes(parse_tree):
    """
    Convert to AST using ASTNode objects.
    """
    if not isinstance(parse_tree, tuple):
        return ASTNode('literal', value=parse_tree)

    symbol = parse_tree[0]

    # Terminal with value
    if len(parse_tree) == 2 and not isinstance(parse_tree[1], tuple):
        if symbol in ['num', 'NUMBER']:
            return ASTNode('number', value=parse_tree[1])
        elif symbol in ['id', 'IDENTIFIER']:
            return ASTNode('identifier', value=parse_tree[1])
        else:
            return ASTNode(symbol, value=parse_tree[1])

    # Process children
    children = [parse_tree_to_ast_nodes(child) for child in parse_tree[1:]]

    # Simplification
    if symbol in ['E', 'T', 'F', 'E_prime', 'T_prime']:
        # Look for binary operation pattern
        if len(children) == 3:
            # Assume: left op right
            op = children[1]
            if hasattr(op, 'value') and op.value in ['+', '-', '*', '/']:
                return ASTNode('binop', value=op.value, children=[children[0], children[2]])

        # Single child passthrough
        if len(children) == 1:
            return children[0]

    return ASTNode(symbol, children=children)

# Test
parse_tree = ('E', ('T', ('num', 5)), ('+', '+'), ('E', ('T', ('num', 3))))
ast = parse_tree_to_ast(parse_tree)
print(ast)`,
    testCases: [
      { input: "('num', 5)", expectedOutput: '5', isHidden: false, description: 'Leaf node' },
      { input: "('E', ('T', ('num', 5)), ('+', '+'), ('E', ('T', ('num', 3))))", expectedOutput: "('+', 5, 3)", isHidden: false, description: 'Binary operation' },
      { input: 'complex_parse_tree', expectedOutput: 'Simplified AST', isHidden: true, description: 'Nested expression' }
    ],
    hints: [
      'AST omits syntactic details like intermediate nonterminals',
      'Keep only semantically significant nodes',
      'Operators become parent nodes with operand children',
      'Literals become leaf nodes with values',
      'Remove chain productions (A → B where B is the only child)'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex15',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'Error Recovery in Parsing',
    difficulty: 4,
    description: 'Implement panic mode error recovery in a recursive descent parser.',
    starterCode: `class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0
        self.errors = []

    def parse_with_recovery(self, sync_tokens):
        """
        Parse with error recovery.
        sync_tokens: tokens to synchronize on after error
        """
        # Your code here
        pass

# Test
tokens = [('NUMBER', 5), ('ERROR', '!'), ('PLUS', '+'), ('NUMBER', 3)]
parser = Parser(tokens)
result = parser.parse_with_recovery(['PLUS', 'SEMICOLON'])
print(f"Errors: {parser.errors}")`,
    solution: `class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0
        self.errors = []

    def peek(self):
        return self.tokens[self.pos] if self.pos < len(self.tokens) else None

    def consume(self, expected_type):
        token = self.peek()
        if not token:
            self.errors.append(f"Unexpected end of input, expected {expected_type}")
            raise SyntaxError("EOF")

        if token[0] != expected_type:
            self.errors.append(f"Expected {expected_type}, got {token[0]} at position {self.pos}")
            raise SyntaxError(f"Token mismatch")

        self.pos += 1
        return token

    def sync(self, sync_tokens):
        """Skip tokens until we find a synchronization token"""
        while self.peek():
            if self.peek()[0] in sync_tokens:
                break
            self.pos += 1

    def parse_with_recovery(self, sync_tokens):
        """
        Parse with error recovery.
        sync_tokens: tokens to synchronize on after error
        """
        result = []

        while self.pos < len(self.tokens):
            try:
                node = self.parse_expression()
                result.append(node)

                # Check for statement terminator
                if self.peek() and self.peek()[0] == 'SEMICOLON':
                    self.consume('SEMICOLON')

            except SyntaxError as e:
                # Error recovery: sync to next safe point
                self.sync(sync_tokens)

                # Skip the sync token
                if self.peek() and self.peek()[0] in sync_tokens:
                    self.pos += 1

        return result

    def parse_expression(self):
        """E → T + E | T"""
        left = self.parse_term()

        if self.peek() and self.peek()[0] == 'PLUS':
            self.consume('PLUS')
            right = self.parse_expression()
            return ('ADD', left, right)

        return left

    def parse_term(self):
        """T → num"""
        token = self.consume('NUMBER')
        return ('NUM', token[1])

# More sophisticated error recovery
class RobustParser(Parser):
    def parse_expression_robust(self):
        """Parse with local error recovery"""
        try:
            return self.parse_expression()
        except SyntaxError:
            # Try to recover by assuming a number
            self.errors.append(f"Recovering by inserting default value at {self.pos}")
            return ('NUM', 0)

    def parse_term_robust(self):
        """Parse term with error recovery"""
        token = self.peek()

        if not token:
            raise SyntaxError("EOF")

        if token[0] == 'NUMBER':
            self.consume('NUMBER')
            return ('NUM', token[1])
        else:
            # Error: expected number
            self.errors.append(f"Expected NUMBER, got {token[0]} at {self.pos}")

            # Skip this token and try to continue
            self.pos += 1

            # Try next token
            if self.peek() and self.peek()[0] == 'NUMBER':
                return self.parse_term_robust()
            else:
                # Give up and return error node
                return ('ERROR', None)

# Test
tokens = [('NUMBER', 5), ('ERROR', '!'), ('PLUS', '+'), ('NUMBER', 3)]
parser = Parser(tokens)
result = parser.parse_with_recovery(['PLUS', 'SEMICOLON'])
print(f"Errors: {parser.errors}")
print(f"Result: {result}")`,
    testCases: [
      { input: "valid_tokens", expectedOutput: 'No errors', isHidden: false, description: 'Valid input' },
      { input: "tokens_with_error", expectedOutput: 'Errors reported, parsing continues', isHidden: false, description: 'Error recovery' },
      { input: "multiple_errors", expectedOutput: 'Multiple errors detected', isHidden: true, description: 'Multiple error recovery' }
    ],
    hints: [
      'Catch syntax errors instead of aborting',
      'Skip tokens until you find a synchronization point',
      'Common sync tokens: semicolon, closing brace, keywords',
      'Report errors but continue parsing',
      'May insert/delete tokens to recover'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t2-ex16',
    subjectId: 'cs304',
    topicId: 'cs304-topic-2',
    title: 'Earley Parser Implementation',
    difficulty: 5,
    description: 'Implement a simplified Earley parser that can handle any context-free grammar.',
    starterCode: `def earley_parse(grammar, start_symbol, tokens):
    """
    Parse using Earley algorithm.
    grammar: dict {nonterminal: [[production], ...]}
    Returns: True if tokens are accepted, False otherwise
    """
    # Your code here
    pass

# Test
grammar = {
    'S': [['A', 'B']],
    'A': [['a'], []],  # A can be epsilon
    'B': [['b']]
}
print(earley_parse(grammar, 'S', ['a', 'b']))  # True
print(earley_parse(grammar, 'S', ['b']))       # True`,
    solution: `def earley_parse(grammar, start_symbol, tokens):
    """
    Parse using Earley algorithm.
    Handles any CFG including ambiguous and left-recursive grammars.
    """
    class EarleyItem:
        def __init__(self, nonterminal, production, dot, start_pos):
            self.nonterminal = nonterminal
            self.production = production
            self.dot = dot
            self.start_pos = start_pos

        def __eq__(self, other):
            return (self.nonterminal == other.nonterminal and
                    self.production == other.production and
                    self.dot == other.dot and
                    self.start_pos == other.start_pos)

        def __hash__(self):
            return hash((self.nonterminal, self.production, self.dot, self.start_pos))

        def __repr__(self):
            prod_str = list(self.production)
            prod_str.insert(self.dot, '•')
            return f"{self.nonterminal} → {' '.join(prod_str)} ({self.start_pos})"

        def next_symbol(self):
            return self.production[self.dot] if self.dot < len(self.production) else None

        def is_complete(self):
            return self.dot >= len(self.production)

    # Initialize chart
    chart = [set() for _ in range(len(tokens) + 1)]

    # Add start rule: S' → •S
    start_item = EarleyItem(start_symbol + "'", (start_symbol,), 0, 0)
    chart[0].add(start_item)

    # Process each position
    for i in range(len(tokens) + 1):
        changed = True
        while changed:
            changed = False
            current_items = list(chart[i])

            for item in current_items:
                if item.is_complete():
                    # Completer
                    for earlier_item in chart[item.start_pos]:
                        if (earlier_item.next_symbol() == item.nonterminal and
                            not earlier_item.is_complete()):
                            new_item = EarleyItem(
                                earlier_item.nonterminal,
                                earlier_item.production,
                                earlier_item.dot + 1,
                                earlier_item.start_pos
                            )
                            if new_item not in chart[i]:
                                chart[i].add(new_item)
                                changed = True

                else:
                    next_sym = item.next_symbol()

                    if next_sym in grammar:
                        # Predictor
                        for production in grammar[next_sym]:
                            new_item = EarleyItem(
                                next_sym,
                                tuple(production) if production else (),
                                0,
                                i
                            )
                            if new_item not in chart[i]:
                                chart[i].add(new_item)
                                changed = True

                    elif i < len(tokens) and next_sym == tokens[i]:
                        # Scanner
                        new_item = EarleyItem(
                            item.nonterminal,
                            item.production,
                            item.dot + 1,
                            item.start_pos
                        )
                        if new_item not in chart[i + 1]:
                            chart[i + 1].add(new_item)

    # Check if parse succeeded
    for item in chart[len(tokens)]:
        if (item.nonterminal == start_symbol + "'" and
            item.is_complete() and
            item.start_pos == 0):
            return True

    return False

# Test
grammar = {
    'S': [['A', 'B']],
    'A': [['a'], []],  # A can be epsilon
    'B': [['b']]
}
print(earley_parse(grammar, 'S', ['a', 'b']))  # True
print(earley_parse(grammar, 'S', ['b']))       # True
print(earley_parse(grammar, 'S', ['a']))       # False`,
    testCases: [
      { input: "['a', 'b']", expectedOutput: 'True', isHidden: false, description: 'Valid input with both symbols' },
      { input: "['b']", expectedOutput: 'True', isHidden: false, description: 'Valid input with epsilon production' },
      { input: "['a']", expectedOutput: 'False', isHidden: true, description: 'Invalid input' }
    ],
    hints: [
      'Earley parser uses dynamic programming with chart parsing',
      'Three operations: Predictor (add items for nonterminals), Scanner (match terminals), Completer (finish items)',
      'Chart[i] contains all items at position i',
      'Item is (nonterminal, production, dot position, start position)',
      'Accepts if chart[n] contains S\' → S• starting at 0'
    ],
    language: 'python'
  }
];
