import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'cs304-t1-ex01',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'Simple Tokenizer for Arithmetic',
    difficulty: 1,
    description: 'Implement a basic tokenizer that recognizes numbers, operators (+, -, *, /), and parentheses in arithmetic expressions.',
    starterCode: `def tokenize(input_str):
    """
    Tokenize an arithmetic expression.
    Return a list of tuples: [(token_type, value), ...]
    Types: NUMBER, PLUS, MINUS, MULTIPLY, DIVIDE, LPAREN, RPAREN
    """
    # Your code here
    pass

# Test
print(tokenize("12 + 34 * (5 - 6)"))`,
    solution: `def tokenize(input_str):
    """
    Tokenize an arithmetic expression.
    Return a list of tuples: [(token_type, value), ...]
    """
    tokens = []
    i = 0

    while i < len(input_str):
        if input_str[i].isspace():
            i += 1
            continue

        if input_str[i].isdigit():
            num = ''
            while i < len(input_str) and input_str[i].isdigit():
                num += input_str[i]
                i += 1
            tokens.append(('NUMBER', int(num)))
        elif input_str[i] == '+':
            tokens.append(('PLUS', '+'))
            i += 1
        elif input_str[i] == '-':
            tokens.append(('MINUS', '-'))
            i += 1
        elif input_str[i] == '*':
            tokens.append(('MULTIPLY', '*'))
            i += 1
        elif input_str[i] == '/':
            tokens.append(('DIVIDE', '/'))
            i += 1
        elif input_str[i] == '(':
            tokens.append(('LPAREN', '('))
            i += 1
        elif input_str[i] == ')':
            tokens.append(('RPAREN', ')'))
            i += 1
        else:
            raise ValueError(f"Unknown character: {input_str[i]}")

    return tokens

# Test
print(tokenize("12 + 34 * (5 - 6)"))`,
    testCases: [
      { input: '42', expectedOutput: "[('NUMBER', 42)]", isHidden: false, description: 'Single number' },
      { input: '1 + 2', expectedOutput: "[('NUMBER', 1), ('PLUS', '+'), ('NUMBER', 2)]", isHidden: false, description: 'Simple addition' },
      { input: '(10 - 5) * 3', expectedOutput: "[('LPAREN', '('), ('NUMBER', 10), ('MINUS', '-'), ('NUMBER', 5), ('RPAREN', ')'), ('MULTIPLY', '*'), ('NUMBER', 3)]", isHidden: true, description: 'Complex expression' }
    ],
    hints: [
      'Process the input character by character',
      'Use a while loop with an index variable',
      'Handle multi-digit numbers by accumulating digits'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex02',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'Identifier Recognition',
    difficulty: 2,
    description: 'Extend the tokenizer to recognize identifiers (variable names) that start with a letter or underscore, followed by letters, digits, or underscores.',
    starterCode: `def tokenize_with_identifiers(input_str):
    """
    Tokenize input recognizing numbers, operators, and identifiers.
    Return list of tuples: [(token_type, value), ...]
    Types: NUMBER, IDENTIFIER, PLUS, MINUS, MULTIPLY, DIVIDE, ASSIGN
    """
    # Your code here
    pass

# Test
print(tokenize_with_identifiers("x = 10 + y2"))`,
    solution: `def tokenize_with_identifiers(input_str):
    """
    Tokenize input recognizing numbers, operators, and identifiers.
    """
    tokens = []
    i = 0

    while i < len(input_str):
        if input_str[i].isspace():
            i += 1
            continue

        if input_str[i].isdigit():
            num = ''
            while i < len(input_str) and input_str[i].isdigit():
                num += input_str[i]
                i += 1
            tokens.append(('NUMBER', int(num)))
        elif input_str[i].isalpha() or input_str[i] == '_':
            identifier = ''
            while i < len(input_str) and (input_str[i].isalnum() or input_str[i] == '_'):
                identifier += input_str[i]
                i += 1
            tokens.append(('IDENTIFIER', identifier))
        elif input_str[i] == '=':
            tokens.append(('ASSIGN', '='))
            i += 1
        elif input_str[i] == '+':
            tokens.append(('PLUS', '+'))
            i += 1
        elif input_str[i] == '-':
            tokens.append(('MINUS', '-'))
            i += 1
        elif input_str[i] == '*':
            tokens.append(('MULTIPLY', '*'))
            i += 1
        elif input_str[i] == '/':
            tokens.append(('DIVIDE', '/'))
            i += 1
        else:
            raise ValueError(f"Unknown character: {input_str[i]}")

    return tokens

# Test
print(tokenize_with_identifiers("x = 10 + y2"))`,
    testCases: [
      { input: 'abc', expectedOutput: "[('IDENTIFIER', 'abc')]", isHidden: false, description: 'Simple identifier' },
      { input: '_var123', expectedOutput: "[('IDENTIFIER', '_var123')]", isHidden: false, description: 'Identifier with underscore and digits' },
      { input: 'x = 10 + y2', expectedOutput: "[('IDENTIFIER', 'x'), ('ASSIGN', '='), ('NUMBER', 10), ('PLUS', '+'), ('IDENTIFIER', 'y2')]", isHidden: true, description: 'Assignment expression' }
    ],
    hints: [
      'Check if character is a letter or underscore for identifier start',
      'Use isalpha() and isalnum() methods',
      'Identifiers can contain digits but cannot start with them'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex03',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'Keyword Recognition',
    difficulty: 2,
    description: 'Implement keyword recognition by distinguishing reserved words (if, else, while, return) from regular identifiers.',
    starterCode: `KEYWORDS = {'if', 'else', 'while', 'return', 'def', 'class'}

def tokenize_with_keywords(input_str):
    """
    Tokenize input distinguishing keywords from identifiers.
    Types: KEYWORD, IDENTIFIER, NUMBER, operators
    """
    # Your code here
    pass

# Test
print(tokenize_with_keywords("if x == 10 return y"))`,
    solution: `KEYWORDS = {'if', 'else', 'while', 'return', 'def', 'class'}

def tokenize_with_keywords(input_str):
    """
    Tokenize input distinguishing keywords from identifiers.
    """
    tokens = []
    i = 0

    while i < len(input_str):
        if input_str[i].isspace():
            i += 1
            continue

        if input_str[i].isdigit():
            num = ''
            while i < len(input_str) and input_str[i].isdigit():
                num += input_str[i]
                i += 1
            tokens.append(('NUMBER', int(num)))
        elif input_str[i].isalpha() or input_str[i] == '_':
            word = ''
            while i < len(input_str) and (input_str[i].isalnum() or input_str[i] == '_'):
                word += input_str[i]
                i += 1
            if word in KEYWORDS:
                tokens.append(('KEYWORD', word))
            else:
                tokens.append(('IDENTIFIER', word))
        elif input_str[i:i+2] == '==':
            tokens.append(('EQUALS', '=='))
            i += 2
        elif input_str[i] == '=':
            tokens.append(('ASSIGN', '='))
            i += 1
        elif input_str[i] == '+':
            tokens.append(('PLUS', '+'))
            i += 1
        elif input_str[i] == '-':
            tokens.append(('MINUS', '-'))
            i += 1
        elif input_str[i] == '*':
            tokens.append(('MULTIPLY', '*'))
            i += 1
        elif input_str[i] == '/':
            tokens.append(('DIVIDE', '/'))
            i += 1
        else:
            raise ValueError(f"Unknown character: {input_str[i]}")

    return tokens

# Test
print(tokenize_with_keywords("if x == 10 return y"))`,
    testCases: [
      { input: 'if', expectedOutput: "[('KEYWORD', 'if')]", isHidden: false, description: 'Single keyword' },
      { input: 'myvar', expectedOutput: "[('IDENTIFIER', 'myvar')]", isHidden: false, description: 'Identifier that is not a keyword' },
      { input: 'if x == 10 return y', expectedOutput: "[('KEYWORD', 'if'), ('IDENTIFIER', 'x'), ('EQUALS', '=='), ('NUMBER', 10), ('KEYWORD', 'return'), ('IDENTIFIER', 'y')]", isHidden: true, description: 'Conditional return statement' }
    ],
    hints: [
      'First tokenize as identifier, then check if it is in the KEYWORDS set',
      'Keywords are context-free in most languages',
      'Handle multi-character operators like == before single character ones'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex04',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'Regular Expression Matcher',
    difficulty: 3,
    description: 'Implement a simple regular expression matcher that supports literals, * (zero or more), and . (any character).',
    starterCode: `def regex_match(pattern, text):
    """
    Return True if pattern matches text.
    Supports: literals, . (any char), * (zero or more of previous)
    """
    # Your code here
    pass

# Test
print(regex_match("a*b", "aaab"))  # True
print(regex_match("a.c", "abc"))   # True
print(regex_match(".*", "hello"))  # True`,
    solution: `def regex_match(pattern, text):
    """
    Return True if pattern matches text.
    Supports: literals, . (any char), * (zero or more of previous)
    """
    if not pattern:
        return not text

    first_match = bool(text) and (pattern[0] == text[0] or pattern[0] == '.')

    if len(pattern) >= 2 and pattern[1] == '*':
        # Two possibilities: skip the * pattern, or use it
        return (regex_match(pattern[2:], text) or
                (first_match and regex_match(pattern, text[1:])))
    else:
        return first_match and regex_match(pattern[1:], text[1:])

# Test
print(regex_match("a*b", "aaab"))  # True
print(regex_match("a.c", "abc"))   # True
print(regex_match(".*", "hello"))  # True`,
    testCases: [
      { input: 'abc|abc', expectedOutput: 'True', isHidden: false, description: 'Exact match' },
      { input: 'a*b|aaab', expectedOutput: 'True', isHidden: false, description: 'Star quantifier' },
      { input: '.*|hello', expectedOutput: 'True', isHidden: false, description: 'Match anything' },
      { input: 'a.c|abc', expectedOutput: 'True', isHidden: true, description: 'Dot wildcard' },
      { input: 'a*b|b', expectedOutput: 'True', isHidden: true, description: 'Star with zero matches' }
    ],
    hints: [
      'Use recursion to handle the pattern matching',
      'Handle the * operator by trying both zero and one-or-more matches',
      'Check if the next character is * before consuming current character'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex05',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'NFA State Representation',
    difficulty: 3,
    description: 'Implement a Non-deterministic Finite Automaton (NFA) data structure with epsilon transitions.',
    starterCode: `class NFA:
    def __init__(self, states, alphabet, transitions, start, accept):
        """
        states: set of state names
        alphabet: set of input symbols
        transitions: dict {(state, symbol): set of next states}
        start: start state
        accept: set of accept states
        Use None for epsilon transitions
        """
        # Your code here
        pass

    def epsilon_closure(self, states):
        """Return set of states reachable via epsilon transitions"""
        # Your code here
        pass

# Test
nfa = NFA({'q0', 'q1', 'q2'}, {'a', 'b'},
          {('q0', 'a'): {'q1'}, ('q1', None): {'q2'}},
          'q0', {'q2'})
print(nfa.epsilon_closure({'q1'}))  # Should include q2`,
    solution: `class NFA:
    def __init__(self, states, alphabet, transitions, start, accept):
        """
        states: set of state names
        alphabet: set of input symbols
        transitions: dict {(state, symbol): set of next states}
        start: start state
        accept: set of accept states
        Use None for epsilon transitions
        """
        self.states = states
        self.alphabet = alphabet
        self.transitions = transitions
        self.start = start
        self.accept = accept

    def epsilon_closure(self, states):
        """Return set of states reachable via epsilon transitions"""
        closure = set(states)
        stack = list(states)

        while stack:
            state = stack.pop()
            epsilon_states = self.transitions.get((state, None), set())
            for next_state in epsilon_states:
                if next_state not in closure:
                    closure.add(next_state)
                    stack.append(next_state)

        return closure

# Test
nfa = NFA({'q0', 'q1', 'q2'}, {'a', 'b'},
          {('q0', 'a'): {'q1'}, ('q1', None): {'q2'}},
          'q0', {'q2'})
print(nfa.epsilon_closure({'q1'}))  # Should include q2`,
    testCases: [
      { input: "{'q1'}", expectedOutput: "{'q1', 'q2'}", isHidden: false, description: 'Epsilon closure from q1' },
      { input: "{'q0'}", expectedOutput: "{'q0'}", isHidden: false, description: 'No epsilon transitions from q0' },
      { input: "{'q1', 'q0'}", expectedOutput: "{'q0', 'q1', 'q2'}", isHidden: true, description: 'Closure from multiple states' }
    ],
    hints: [
      'Use a stack or queue to traverse epsilon transitions',
      'Keep track of visited states to avoid infinite loops',
      'Initialize closure with the input states'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex06',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'NFA Simulation',
    difficulty: 3,
    description: 'Implement the accepts method for an NFA that determines if a string is accepted.',
    starterCode: `class NFA:
    def __init__(self, states, alphabet, transitions, start, accept):
        self.states = states
        self.alphabet = alphabet
        self.transitions = transitions
        self.start = start
        self.accept = accept

    def epsilon_closure(self, states):
        closure = set(states)
        stack = list(states)
        while stack:
            state = stack.pop()
            epsilon_states = self.transitions.get((state, None), set())
            for next_state in epsilon_states:
                if next_state not in closure:
                    closure.add(next_state)
                    stack.append(next_state)
        return closure

    def accepts(self, input_string):
        """Return True if NFA accepts the input string"""
        # Your code here
        pass

# Test
nfa = NFA({'q0', 'q1'}, {'a', 'b'},
          {('q0', 'a'): {'q0', 'q1'}, ('q0', 'b'): {'q0'}},
          'q0', {'q1'})
print(nfa.accepts("bba"))  # True`,
    solution: `class NFA:
    def __init__(self, states, alphabet, transitions, start, accept):
        self.states = states
        self.alphabet = alphabet
        self.transitions = transitions
        self.start = start
        self.accept = accept

    def epsilon_closure(self, states):
        closure = set(states)
        stack = list(states)
        while stack:
            state = stack.pop()
            epsilon_states = self.transitions.get((state, None), set())
            for next_state in epsilon_states:
                if next_state not in closure:
                    closure.add(next_state)
                    stack.append(next_state)
        return closure

    def accepts(self, input_string):
        """Return True if NFA accepts the input string"""
        current_states = self.epsilon_closure({self.start})

        for symbol in input_string:
            next_states = set()
            for state in current_states:
                next_states.update(self.transitions.get((state, symbol), set()))
            current_states = self.epsilon_closure(next_states)

        return bool(current_states & self.accept)

# Test
nfa = NFA({'q0', 'q1'}, {'a', 'b'},
          {('q0', 'a'): {'q0', 'q1'}, ('q0', 'b'): {'q0'}},
          'q0', {'q1'})
print(nfa.accepts("bba"))  # True`,
    testCases: [
      { input: 'bba', expectedOutput: 'True', isHidden: false, description: 'String ending with a' },
      { input: 'bbb', expectedOutput: 'False', isHidden: false, description: 'String not ending with a' },
      { input: 'a', expectedOutput: 'True', isHidden: true, description: 'Single character accepted' }
    ],
    hints: [
      'Start with epsilon closure of the start state',
      'For each input symbol, compute all possible next states',
      'Check if any final state is in the accept states'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex07',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'DFA Implementation',
    difficulty: 2,
    description: 'Implement a Deterministic Finite Automaton (DFA) with a single transition function.',
    starterCode: `class DFA:
    def __init__(self, states, alphabet, transitions, start, accept):
        """
        transitions: dict {(state, symbol): next_state}
        Each (state, symbol) maps to exactly one state
        """
        # Your code here
        pass

    def accepts(self, input_string):
        """Return True if DFA accepts the input string"""
        # Your code here
        pass

# Test
dfa = DFA({'q0', 'q1', 'q2'}, {'0', '1'},
          {('q0', '0'): 'q0', ('q0', '1'): 'q1',
           ('q1', '0'): 'q0', ('q1', '1'): 'q2',
           ('q2', '0'): 'q2', ('q2', '1'): 'q2'},
          'q0', {'q2'})
print(dfa.accepts("011"))  # True`,
    solution: `class DFA:
    def __init__(self, states, alphabet, transitions, start, accept):
        """
        transitions: dict {(state, symbol): next_state}
        Each (state, symbol) maps to exactly one state
        """
        self.states = states
        self.alphabet = alphabet
        self.transitions = transitions
        self.start = start
        self.accept = accept

    def accepts(self, input_string):
        """Return True if DFA accepts the input string"""
        current_state = self.start

        for symbol in input_string:
            if (current_state, symbol) not in self.transitions:
                return False
            current_state = self.transitions[(current_state, symbol)]

        return current_state in self.accept

# Test
dfa = DFA({'q0', 'q1', 'q2'}, {'0', '1'},
          {('q0', '0'): 'q0', ('q0', '1'): 'q1',
           ('q1', '0'): 'q0', ('q1', '1'): 'q2',
           ('q2', '0'): 'q2', ('q2', '1'): 'q2'},
          'q0', {'q2'})
print(dfa.accepts("011"))  # True`,
    testCases: [
      { input: '011', expectedOutput: 'True', isHidden: false, description: 'Contains substring 11' },
      { input: '010', expectedOutput: 'False', isHidden: false, description: 'Does not contain 11' },
      { input: '1111', expectedOutput: 'True', isHidden: true, description: 'Multiple 11 substrings' }
    ],
    hints: [
      'DFA has exactly one transition for each (state, symbol) pair',
      'Track a single current state as you process input',
      'Much simpler than NFA - no epsilon closures or multiple states'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex08',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'String Literal Tokenization',
    difficulty: 3,
    description: 'Implement tokenization of string literals with escape sequences (\\n, \\t, \\\\, \\").',
    starterCode: `def tokenize_string(input_str):
    """
    Tokenize a string literal handling escape sequences.
    Return the actual string value (with escapes processed).
    Input includes the surrounding quotes.
    """
    # Your code here
    pass

# Test
print(tokenize_string('"hello\\nworld"'))  # "hello\nworld"
print(tokenize_string('"say \\"hi\\""'))   # "say "hi""`,
    solution: `def tokenize_string(input_str):
    """
    Tokenize a string literal handling escape sequences.
    Return the actual string value (with escapes processed).
    Input includes the surrounding quotes.
    """
    if not input_str.startswith('"') or not input_str.endswith('"'):
        raise ValueError("String must be enclosed in quotes")

    content = input_str[1:-1]  # Remove quotes
    result = []
    i = 0

    while i < len(content):
        if content[i] == '\\' and i + 1 < len(content):
            next_char = content[i + 1]
            if next_char == 'n':
                result.append('\n')
            elif next_char == 't':
                result.append('\t')
            elif next_char == '\\':
                result.append('\\')
            elif next_char == '"':
                result.append('"')
            else:
                raise ValueError(f"Unknown escape sequence: \\{next_char}")
            i += 2
        else:
            result.append(content[i])
            i += 1

    return ''.join(result)

# Test
print(repr(tokenize_string('"hello\\nworld"')))  # "hello\nworld"
print(repr(tokenize_string('"say \\"hi\\""')))   # "say "hi""`,
    testCases: [
      { input: '"hello"', expectedOutput: "'hello'", isHidden: false, description: 'Simple string' },
      { input: '"hello\\nworld"', expectedOutput: "'hello\\nworld'", isHidden: false, description: 'String with newline escape' },
      { input: '"tab\\there"', expectedOutput: "'tab\\there'", isHidden: true, description: 'String with tab escape' },
      { input: '"quote\\"mark"', expectedOutput: '\'quote"mark\'', isHidden: true, description: 'String with escaped quote' }
    ],
    hints: [
      'Process characters one at a time',
      'When you encounter backslash, check the next character',
      'Map escape sequences to their actual character values'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex09',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'Comment Handling',
    difficulty: 2,
    description: 'Extend tokenizer to skip single-line (//) and multi-line (/* */) comments.',
    starterCode: `def tokenize_with_comments(input_str):
    """
    Tokenize input while skipping comments.
    // starts single-line comment (to end of line)
    /* */ delimits multi-line comment
    """
    # Your code here
    pass

# Test
code = '''x = 5 // assign value
y = /* mid comment */ 10'''
print(tokenize_with_comments(code))`,
    solution: `def tokenize_with_comments(input_str):
    """
    Tokenize input while skipping comments.
    // starts single-line comment (to end of line)
    /* */ delimits multi-line comment
    """
    tokens = []
    i = 0

    while i < len(input_str):
        # Skip whitespace
        if input_str[i].isspace():
            i += 1
            continue

        # Check for comments
        if i + 1 < len(input_str) and input_str[i:i+2] == '//':
            # Skip to end of line
            while i < len(input_str) and input_str[i] != '\n':
                i += 1
            continue

        if i + 1 < len(input_str) and input_str[i:i+2] == '/*':
            # Skip to */
            i += 2
            while i + 1 < len(input_str) and input_str[i:i+2] != '*/':
                i += 1
            i += 2  # Skip */
            continue

        # Regular tokenization
        if input_str[i].isdigit():
            num = ''
            while i < len(input_str) and input_str[i].isdigit():
                num += input_str[i]
                i += 1
            tokens.append(('NUMBER', int(num)))
        elif input_str[i].isalpha() or input_str[i] == '_':
            identifier = ''
            while i < len(input_str) and (input_str[i].isalnum() or input_str[i] == '_'):
                identifier += input_str[i]
                i += 1
            tokens.append(('IDENTIFIER', identifier))
        elif input_str[i] == '=':
            tokens.append(('ASSIGN', '='))
            i += 1
        else:
            i += 1

    return tokens

# Test
code = '''x = 5 // assign value
y = /* mid comment */ 10'''
print(tokenize_with_comments(code))`,
    testCases: [
      { input: 'x = 5 // comment', expectedOutput: "[('IDENTIFIER', 'x'), ('ASSIGN', '='), ('NUMBER', 5)]", isHidden: false, description: 'Single-line comment' },
      { input: 'a = /* skip */ 1', expectedOutput: "[('IDENTIFIER', 'a'), ('ASSIGN', '='), ('NUMBER', 1)]", isHidden: false, description: 'Multi-line comment inline' },
      { input: 'x = 5\ny = 10', expectedOutput: "[('IDENTIFIER', 'x'), ('ASSIGN', '='), ('NUMBER', 5), ('IDENTIFIER', 'y'), ('ASSIGN', '='), ('NUMBER', 10)]", isHidden: true, description: 'Multiple lines no comments' }
    ],
    hints: [
      'Check for comment start sequences before regular tokenization',
      'For //, skip until newline',
      'For /* */, skip until you find */',
      'Use continue to restart the loop after skipping comments'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex10',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'Floating Point Numbers',
    difficulty: 3,
    description: 'Implement tokenization of floating point numbers in scientific notation (e.g., 3.14, 2.5e-3, 1E+10).',
    starterCode: `def tokenize_float(input_str):
    """
    Tokenize floating point numbers including scientific notation.
    Examples: 3.14, 2.5e-3, 1E+10, .5, 5.
    Return ('FLOAT', float_value)
    """
    # Your code here
    pass

# Test
print(tokenize_float("3.14"))      # ('FLOAT', 3.14)
print(tokenize_float("2.5e-3"))    # ('FLOAT', 0.0025)
print(tokenize_float("1E+10"))     # ('FLOAT', 1e10)`,
    solution: `def tokenize_float(input_str):
    """
    Tokenize floating point numbers including scientific notation.
    Examples: 3.14, 2.5e-3, 1E+10, .5, 5.
    Return ('FLOAT', float_value)
    """
    import re

    # Pattern: optional digits, optional decimal point with digits, optional exponent
    pattern = r'^([0-9]*\.?[0-9]+)([eE][+-]?[0-9]+)?$'
    match = re.match(pattern, input_str.strip())

    if match:
        return ('FLOAT', float(input_str))
    else:
        raise ValueError(f"Invalid float: {input_str}")

# Alternative without regex:
def tokenize_float_manual(input_str):
    s = input_str.strip()
    i = 0

    # Integer part
    int_part = ''
    while i < len(s) and s[i].isdigit():
        int_part += s[i]
        i += 1

    # Decimal part
    dec_part = ''
    if i < len(s) and s[i] == '.':
        dec_part = '.'
        i += 1
        while i < len(s) and s[i].isdigit():
            dec_part += s[i]
            i += 1

    # Must have either integer or decimal digits
    if not int_part and dec_part == '.':
        raise ValueError("Invalid float")

    # Exponent part
    exp_part = ''
    if i < len(s) and s[i] in 'eE':
        exp_part = s[i]
        i += 1
        if i < len(s) and s[i] in '+-':
            exp_part += s[i]
            i += 1
        while i < len(s) and s[i].isdigit():
            exp_part += s[i]
            i += 1

    if i != len(s):
        raise ValueError("Invalid float")

    return ('FLOAT', float(int_part + dec_part + exp_part))

# Test
print(tokenize_float("3.14"))      # ('FLOAT', 3.14)
print(tokenize_float("2.5e-3"))    # ('FLOAT', 0.0025)
print(tokenize_float("1E+10"))     # ('FLOAT', 1e10)`,
    testCases: [
      { input: '3.14', expectedOutput: "('FLOAT', 3.14)", isHidden: false, description: 'Simple decimal' },
      { input: '2.5e-3', expectedOutput: "('FLOAT', 0.0025)", isHidden: false, description: 'Scientific notation with negative exponent' },
      { input: '1E+10', expectedOutput: "('FLOAT', 10000000000.0)", isHidden: true, description: 'Scientific notation with positive exponent' },
      { input: '.5', expectedOutput: "('FLOAT', 0.5)", isHidden: true, description: 'Leading decimal point' }
    ],
    hints: [
      'You can use Python\'s float() function to parse the final value',
      'Handle optional parts: integer, decimal, exponent',
      'Exponent can have optional + or - sign',
      'Consider using regex or manual character scanning'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex11',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'NFA to DFA Conversion - Simple Case',
    difficulty: 4,
    description: 'Implement the subset construction algorithm to convert a simple NFA to a DFA.',
    starterCode: `def nfa_to_dfa(nfa):
    """
    Convert NFA to DFA using subset construction.
    nfa: dict with 'states', 'alphabet', 'transitions', 'start', 'accept'
    Return equivalent DFA structure.
    """
    # Your code here
    pass

# Test
nfa = {
    'states': {'q0', 'q1', 'q2'},
    'alphabet': {'a', 'b'},
    'transitions': {
        ('q0', 'a'): {'q0', 'q1'},
        ('q0', 'b'): {'q0'},
        ('q1', 'b'): {'q2'}
    },
    'start': 'q0',
    'accept': {'q2'}
}
dfa = nfa_to_dfa(nfa)
print(len(dfa['states']))  # Number of DFA states`,
    solution: `def nfa_to_dfa(nfa):
    """
    Convert NFA to DFA using subset construction.
    """
    def get_transitions(states, symbol):
        """Get all states reachable from states via symbol"""
        result = set()
        for state in states:
            result.update(nfa['transitions'].get((state, symbol), set()))
        return result

    # Start with the start state as a set
    start_set = frozenset({nfa['start']})
    dfa_states = {start_set}
    dfa_transitions = {}
    unmarked = [start_set]

    while unmarked:
        current = unmarked.pop()

        for symbol in nfa['alphabet']:
            next_states = get_transitions(current, symbol)
            next_set = frozenset(next_states)

            if next_set:  # Only add non-empty sets
                dfa_transitions[(current, symbol)] = next_set

                if next_set not in dfa_states:
                    dfa_states.add(next_set)
                    unmarked.append(next_set)

    # Accept states are those containing an NFA accept state
    dfa_accept = {s for s in dfa_states
                  if any(state in nfa['accept'] for state in s)}

    return {
        'states': dfa_states,
        'alphabet': nfa['alphabet'],
        'transitions': dfa_transitions,
        'start': start_set,
        'accept': dfa_accept
    }

# Test
nfa = {
    'states': {'q0', 'q1', 'q2'},
    'alphabet': {'a', 'b'},
    'transitions': {
        ('q0', 'a'): {'q0', 'q1'},
        ('q0', 'b'): {'q0'},
        ('q1', 'b'): {'q2'}
    },
    'start': 'q0',
    'accept': {'q2'}
}
dfa = nfa_to_dfa(nfa)
print(len(dfa['states']))  # Number of DFA states`,
    testCases: [
      { input: 'nfa1', expectedOutput: '4', isHidden: false, description: 'NFA with multiple transitions results in DFA' },
      { input: 'nfa2', expectedOutput: '3', isHidden: true, description: 'Different NFA structure' }
    ],
    hints: [
      'Use frozenset to represent DFA states (sets of NFA states)',
      'Start with the NFA start state as a single-element set',
      'Process each unmarked DFA state by computing transitions',
      'A DFA state is accepting if it contains any NFA accept state'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex12',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'Maximal Munch Tokenization',
    difficulty: 3,
    description: 'Implement maximal munch (longest match) tokenization for recognizing multi-character operators.',
    starterCode: `def tokenize_maximal_munch(input_str):
    """
    Tokenize using maximal munch for operators.
    Operators: ==, !=, <=, >=, <, >, =, +, -, *, /
    Always prefer longer match (e.g., == over =)
    """
    # Your code here
    pass

# Test
print(tokenize_maximal_munch("x == 5"))
print(tokenize_maximal_munch("y != 10"))`,
    solution: `def tokenize_maximal_munch(input_str):
    """
    Tokenize using maximal munch for operators.
    Operators: ==, !=, <=, >=, <, >, =, +, -, *, /
    Always prefer longer match (e.g., == over =)
    """
    # Two-character operators must be checked first
    two_char_ops = {'==': 'EQ', '!=': 'NE', '<=': 'LE', '>=': 'GE'}
    one_char_ops = {'<': 'LT', '>': 'GT', '=': 'ASSIGN',
                    '+': 'PLUS', '-': 'MINUS', '*': 'MUL', '/': 'DIV'}

    tokens = []
    i = 0

    while i < len(input_str):
        if input_str[i].isspace():
            i += 1
            continue

        # Try two-character operators first (maximal munch)
        if i + 1 < len(input_str) and input_str[i:i+2] in two_char_ops:
            tokens.append((two_char_ops[input_str[i:i+2]], input_str[i:i+2]))
            i += 2
        # Then try one-character operators
        elif input_str[i] in one_char_ops:
            tokens.append((one_char_ops[input_str[i]], input_str[i]))
            i += 1
        # Numbers
        elif input_str[i].isdigit():
            num = ''
            while i < len(input_str) and input_str[i].isdigit():
                num += input_str[i]
                i += 1
            tokens.append(('NUMBER', int(num)))
        # Identifiers
        elif input_str[i].isalpha() or input_str[i] == '_':
            ident = ''
            while i < len(input_str) and (input_str[i].isalnum() or input_str[i] == '_'):
                ident += input_str[i]
                i += 1
            tokens.append(('IDENTIFIER', ident))
        else:
            raise ValueError(f"Unknown character: {input_str[i]}")

    return tokens

# Test
print(tokenize_maximal_munch("x == 5"))
print(tokenize_maximal_munch("y != 10"))`,
    testCases: [
      { input: 'x == 5', expectedOutput: "[('IDENTIFIER', 'x'), ('EQ', '=='), ('NUMBER', 5)]", isHidden: false, description: 'Equality operator' },
      { input: 'y != 10', expectedOutput: "[('IDENTIFIER', 'y'), ('NE', '!='), ('NUMBER', 10)]", isHidden: false, description: 'Not equal operator' },
      { input: 'a = b', expectedOutput: "[('IDENTIFIER', 'a'), ('ASSIGN', '='), ('IDENTIFIER', 'b')]", isHidden: true, description: 'Single character assignment' },
      { input: 'x <= y', expectedOutput: "[('IDENTIFIER', 'x'), ('LE', '<='), ('IDENTIFIER', 'y')]", isHidden: true, description: 'Less than or equal' }
    ],
    hints: [
      'Check for longer operators before shorter ones',
      'Use a dictionary for quick operator lookup',
      'Always consume the maximum number of characters possible'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex13',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'DFA Minimization - Partition Refinement',
    difficulty: 5,
    description: 'Implement DFA minimization using the partition refinement algorithm to merge equivalent states.',
    starterCode: `def minimize_dfa(dfa):
    """
    Minimize a DFA by merging equivalent states.
    dfa: dict with 'states', 'alphabet', 'transitions', 'start', 'accept'
    Return minimized DFA with fewest states.
    """
    # Your code here
    pass

# Test
dfa = {
    'states': {'q0', 'q1', 'q2', 'q3'},
    'alphabet': {'a', 'b'},
    'transitions': {
        ('q0', 'a'): 'q1', ('q0', 'b'): 'q2',
        ('q1', 'a'): 'q1', ('q1', 'b'): 'q3',
        ('q2', 'a'): 'q1', ('q2', 'b'): 'q2',
        ('q3', 'a'): 'q1', ('q3', 'b'): 'q3'
    },
    'start': 'q0',
    'accept': {'q3'}
}
min_dfa = minimize_dfa(dfa)
print(len(min_dfa['states']))`,
    solution: `def minimize_dfa(dfa):
    """
    Minimize a DFA by merging equivalent states.
    Uses partition refinement algorithm.
    """
    states = dfa['states']
    alphabet = dfa['alphabet']
    transitions = dfa['transitions']
    accept = dfa['accept']

    # Initial partition: accepting vs non-accepting states
    partitions = [accept, states - accept]
    partitions = [p for p in partitions if p]  # Remove empty sets

    changed = True
    while changed:
        changed = False
        new_partitions = []

        for partition in partitions:
            # Try to split this partition
            splits = {}

            for state in partition:
                # Create signature: which partition each symbol leads to
                signature = tuple(
                    next((i for i, p in enumerate(partitions)
                          if transitions.get((state, symbol)) in p), None)
                    for symbol in sorted(alphabet)
                )

                if signature not in splits:
                    splits[signature] = set()
                splits[signature].add(state)

            if len(splits) > 1:
                changed = True

            new_partitions.extend(splits.values())

        partitions = new_partitions

    # Build minimized DFA
    # Map each state to its partition
    state_to_partition = {}
    for i, partition in enumerate(partitions):
        for state in partition:
            state_to_partition[state] = i

    # Create new transitions
    new_transitions = {}
    for (state, symbol), target in transitions.items():
        new_state = state_to_partition[state]
        new_target = state_to_partition[target]
        new_transitions[(new_state, symbol)] = new_target

    new_start = state_to_partition[dfa['start']]
    new_accept = {state_to_partition[s] for s in accept}

    return {
        'states': set(range(len(partitions))),
        'alphabet': alphabet,
        'transitions': new_transitions,
        'start': new_start,
        'accept': new_accept
    }

# Test
dfa = {
    'states': {'q0', 'q1', 'q2', 'q3'},
    'alphabet': {'a', 'b'},
    'transitions': {
        ('q0', 'a'): 'q1', ('q0', 'b'): 'q2',
        ('q1', 'a'): 'q1', ('q1', 'b'): 'q3',
        ('q2', 'a'): 'q1', ('q2', 'b'): 'q2',
        ('q3', 'a'): 'q1', ('q3', 'b'): 'q3'
    },
    'start': 'q0',
    'accept': {'q3'}
}
min_dfa = minimize_dfa(dfa)
print(len(min_dfa['states']))`,
    testCases: [
      { input: 'dfa1', expectedOutput: '3', isHidden: false, description: 'DFA with redundant states' },
      { input: 'dfa2', expectedOutput: '2', isHidden: true, description: 'DFA that minimizes to 2 states' }
    ],
    hints: [
      'Start with two partitions: accepting and non-accepting states',
      'Repeatedly refine partitions based on transition behavior',
      'Two states are equivalent if they transition to the same partitions',
      'Stop when no partition can be split further'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex14',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'Lexical Error Recovery',
    difficulty: 4,
    description: 'Implement error recovery in a tokenizer that skips invalid characters and reports errors with line/column info.',
    starterCode: `def tokenize_with_errors(input_str):
    """
    Tokenize input and report errors without stopping.
    Return (tokens, errors) where errors is list of:
    {'line': line_num, 'col': col_num, 'char': bad_char}
    """
    # Your code here
    pass

# Test
code = '''x = 5
y @ 10
z = 15'''
tokens, errors = tokenize_with_errors(code)
print(f"Tokens: {tokens}")
print(f"Errors: {errors}")`,
    solution: `def tokenize_with_errors(input_str):
    """
    Tokenize input and report errors without stopping.
    Return (tokens, errors) where errors is list of:
    {'line': line_num, 'col': col_num, 'char': bad_char}
    """
    tokens = []
    errors = []
    i = 0
    line = 1
    col = 1

    while i < len(input_str):
        start_col = col

        if input_str[i] == '\n':
            line += 1
            col = 1
            i += 1
            continue

        if input_str[i].isspace():
            col += 1
            i += 1
            continue

        # Numbers
        if input_str[i].isdigit():
            num = ''
            while i < len(input_str) and input_str[i].isdigit():
                num += input_str[i]
                i += 1
                col += 1
            tokens.append(('NUMBER', int(num)))
        # Identifiers
        elif input_str[i].isalpha() or input_str[i] == '_':
            ident = ''
            while i < len(input_str) and (input_str[i].isalnum() or input_str[i] == '_'):
                ident += input_str[i]
                i += 1
                col += 1
            tokens.append(('IDENTIFIER', ident))
        # Valid operators
        elif input_str[i] in '=+-*/':
            tokens.append(('OPERATOR', input_str[i]))
            i += 1
            col += 1
        # Invalid character - report error and skip
        else:
            errors.append({
                'line': line,
                'col': start_col,
                'char': input_str[i]
            })
            i += 1
            col += 1

    return tokens, errors

# Test
code = '''x = 5
y @ 10
z = 15'''
tokens, errors = tokenize_with_errors(code)
print(f"Tokens: {tokens}")
print(f"Errors: {errors}")`,
    testCases: [
      { input: 'x = 5', expectedOutput: '(tokens, [])', isHidden: false, description: 'No errors' },
      { input: 'y @ 10', expectedOutput: "(tokens, [{'line': 1, 'col': 3, 'char': '@'}])", isHidden: false, description: 'Invalid operator' },
      { input: 'a #\nb', expectedOutput: "(tokens, [{'line': 1, 'col': 3, 'char': '#'}])", isHidden: true, description: 'Error on first line' }
    ],
    hints: [
      'Track line and column numbers as you scan',
      'When encountering an invalid character, record the error and continue',
      'Increment line counter on newline, reset column to 1',
      'Don\'t stop tokenization on errors - collect them all'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex15',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'Context-Sensitive Tokenization',
    difficulty: 4,
    description: 'Implement tokenization where < can mean either less-than or the start of a template (like C++ templates), depending on context.',
    starterCode: `def tokenize_context_sensitive(input_str, in_template=False):
    """
    Tokenize with context-sensitive handling of < and >.
    When in_template=True, < and > are TEMPLATE_OPEN/CLOSE.
    Otherwise, they are LT/GT operators.
    Handle 'template' keyword to enter template context.
    """
    # Your code here
    pass

# Test
print(tokenize_context_sensitive("a < b"))
print(tokenize_context_sensitive("template<int>"))`,
    solution: `def tokenize_context_sensitive(input_str, in_template=False):
    """
    Tokenize with context-sensitive handling of < and >.
    When in_template=True, < and > are TEMPLATE_OPEN/CLOSE.
    Otherwise, they are LT/GT operators.
    """
    tokens = []
    i = 0
    template_depth = 0

    while i < len(input_str):
        if input_str[i].isspace():
            i += 1
            continue

        # Identifiers and keywords
        if input_str[i].isalpha() or input_str[i] == '_':
            word = ''
            while i < len(input_str) and (input_str[i].isalnum() or input_str[i] == '_'):
                word += input_str[i]
                i += 1

            if word == 'template':
                tokens.append(('KEYWORD', 'template'))
                # Next < will be template open
                # We'll handle this in < processing
            else:
                tokens.append(('IDENTIFIER', word))

        # Numbers
        elif input_str[i].isdigit():
            num = ''
            while i < len(input_str) and input_str[i].isdigit():
                num += input_str[i]
                i += 1
            tokens.append(('NUMBER', int(num)))

        # Context-sensitive < and >
        elif input_str[i] == '<':
            # Check if previous token was 'template' keyword or we're in template
            if (tokens and tokens[-1] == ('KEYWORD', 'template')) or template_depth > 0:
                tokens.append(('TEMPLATE_OPEN', '<'))
                template_depth += 1
            else:
                tokens.append(('LT', '<'))
            i += 1

        elif input_str[i] == '>':
            if template_depth > 0:
                tokens.append(('TEMPLATE_CLOSE', '>'))
                template_depth -= 1
            else:
                tokens.append(('GT', '>'))
            i += 1

        else:
            i += 1

    return tokens

# Test
print(tokenize_context_sensitive("a < b"))
print(tokenize_context_sensitive("template<int>"))`,
    testCases: [
      { input: 'a < b', expectedOutput: "[('IDENTIFIER', 'a'), ('LT', '<'), ('IDENTIFIER', 'b')]", isHidden: false, description: 'Less-than operator' },
      { input: 'template<int>', expectedOutput: "[('KEYWORD', 'template'), ('TEMPLATE_OPEN', '<'), ('IDENTIFIER', 'int'), ('TEMPLATE_CLOSE', '>')]", isHidden: false, description: 'Template syntax' },
      { input: 'template<pair<int>>', expectedOutput: "nested templates", isHidden: true, description: 'Nested template parameters' }
    ],
    hints: [
      'Keep track of whether you\'re inside template brackets',
      'Use a depth counter for nested templates',
      'Check previous token to see if it was the template keyword',
      'This is why C++ is hard to parse!'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t1-ex16',
    subjectId: 'cs304',
    topicId: 'cs304-topic-1',
    title: 'Complete Lexer with Position Tracking',
    difficulty: 5,
    description: 'Build a complete lexer that tracks file position, handles all previous token types, and returns a token stream with metadata.',
    starterCode: `class Token:
    def __init__(self, type, value, line, col, length):
        self.type = type
        self.value = value
        self.line = line
        self.col = col
        self.length = length

    def __repr__(self):
        return f"Token({self.type}, {self.value!r}, {self.line}:{self.col})"

class Lexer:
    def __init__(self, input_str):
        self.input = input_str
        self.pos = 0
        self.line = 1
        self.col = 1

    def tokenize(self):
        """Return list of Token objects"""
        # Your code here
        pass

# Test
lexer = Lexer('x = 42 // comment\\ny = "hello"')
tokens = lexer.tokenize()
for tok in tokens:
    print(tok)`,
    solution: `class Token:
    def __init__(self, type, value, line, col, length):
        self.type = type
        self.value = value
        self.line = line
        self.col = col
        self.length = length

    def __repr__(self):
        return f"Token({self.type}, {self.value!r}, {self.line}:{self.col})"

class Lexer:
    def __init__(self, input_str):
        self.input = input_str
        self.pos = 0
        self.line = 1
        self.col = 1

    def peek(self, offset=0):
        pos = self.pos + offset
        return self.input[pos] if pos < len(self.input) else None

    def advance(self):
        if self.pos < len(self.input):
            if self.input[self.pos] == '\n':
                self.line += 1
                self.col = 1
            else:
                self.col += 1
            self.pos += 1

    def skip_whitespace(self):
        while self.peek() and self.peek().isspace():
            self.advance()

    def tokenize(self):
        tokens = []

        while self.pos < len(self.input):
            self.skip_whitespace()
            if self.pos >= len(self.input):
                break

            start_line, start_col = self.line, self.col

            # Comments
            if self.peek() == '/' and self.peek(1) == '/':
                while self.peek() and self.peek() != '\n':
                    self.advance()
                continue

            # Strings
            if self.peek() == '"':
                self.advance()
                value = ''
                while self.peek() and self.peek() != '"':
                    if self.peek() == '\\':
                        self.advance()
                        if self.peek() == 'n':
                            value += '\n'
                        elif self.peek() == 't':
                            value += '\t'
                        elif self.peek():
                            value += self.peek()
                        self.advance()
                    else:
                        value += self.peek()
                        self.advance()
                self.advance()  # closing "
                tokens.append(Token('STRING', value, start_line, start_col, self.col - start_col))

            # Numbers
            elif self.peek() and self.peek().isdigit():
                value = ''
                while self.peek() and self.peek().isdigit():
                    value += self.peek()
                    self.advance()
                tokens.append(Token('NUMBER', int(value), start_line, start_col, self.col - start_col))

            # Identifiers
            elif self.peek() and (self.peek().isalpha() or self.peek() == '_'):
                value = ''
                while self.peek() and (self.peek().isalnum() or self.peek() == '_'):
                    value += self.peek()
                    self.advance()
                tokens.append(Token('IDENTIFIER', value, start_line, start_col, self.col - start_col))

            # Operators
            elif self.peek() == '=' and self.peek(1) == '=':
                self.advance()
                self.advance()
                tokens.append(Token('EQUALS', '==', start_line, start_col, 2))
            elif self.peek() == '=':
                self.advance()
                tokens.append(Token('ASSIGN', '=', start_line, start_col, 1))
            elif self.peek() in '+-*/':
                op = self.peek()
                self.advance()
                tokens.append(Token('OPERATOR', op, start_line, start_col, 1))
            else:
                self.advance()

        return tokens

# Test
lexer = Lexer('x = 42 // comment\\ny = "hello"')
tokens = lexer.tokenize()
for tok in tokens:
    print(tok)`,
    testCases: [
      { input: 'x = 42', expectedOutput: '3 tokens', isHidden: false, description: 'Simple assignment' },
      { input: 'x = 42 // comment', expectedOutput: '3 tokens (comment ignored)', isHidden: false, description: 'Assignment with comment' },
      { input: 'y = "hello"', expectedOutput: '3 tokens with string', isHidden: true, description: 'String literal' }
    ],
    hints: [
      'Use a Lexer class to maintain state (position, line, column)',
      'Implement helper methods like peek(), advance(), skip_whitespace()',
      'Create Token objects with full position metadata',
      'Handle all token types from previous exercises',
      'Track line and column accurately through newlines'
    ],
    language: 'python'
  }
];
