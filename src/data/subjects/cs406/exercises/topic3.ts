import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'cs406-t3-ex01',
    subjectId: 'cs406',
    topicId: 'cs406-topic-3',
    title: 'Minimax for Tic-Tac-Toe',
    difficulty: 2,
    description: `Implement the Minimax algorithm for Tic-Tac-Toe.

Your implementation should:
- Evaluate terminal states (+1 for X win, -1 for O win, 0 for draw)
- Recursively evaluate all possible moves
- MAX player maximizes, MIN player minimizes
- Return the best move and its value`,
    starterCode: `def check_winner(board):
    # Return 'X', 'O', 'draw', or None (game ongoing)
    pass

def get_moves(board):
    # Return list of available positions
    pass

def minimax(board, is_max_player):
    # Implement minimax
    # Returns: (best_value, best_move)
    pass

# Board: 3x3 list, with 'X', 'O', or None`,
    solution: `def check_winner(board):
    """Check if there's a winner. Returns 'X', 'O', 'draw', or None."""
    # Check rows
    for row in board:
        if row[0] == row[1] == row[2] and row[0] is not None:
            return row[0]

    # Check columns
    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] and board[0][col] is not None:
            return board[0][col]

    # Check diagonals
    if board[0][0] == board[1][1] == board[2][2] and board[0][0] is not None:
        return board[0][0]
    if board[0][2] == board[1][1] == board[2][0] and board[0][2] is not None:
        return board[0][2]

    # Check if board is full (draw)
    if all(board[i][j] is not None for i in range(3) for j in range(3)):
        return 'draw'

    return None  # Game ongoing

def get_moves(board):
    """Return list of available (row, col) positions."""
    moves = []
    for i in range(3):
        for j in range(3):
            if board[i][j] is None:
                moves.append((i, j))
    return moves

def minimax(board, is_max_player):
    """
    Minimax algorithm for Tic-Tac-Toe.
    Returns: (best_value, best_move)
    """
    winner = check_winner(board)

    # Terminal states
    if winner == 'X':
        return (1, None)
    elif winner == 'O':
        return (-1, None)
    elif winner == 'draw':
        return (0, None)

    moves = get_moves(board)
    player = 'X' if is_max_player else 'O'

    if is_max_player:
        best_value = float('-inf')
        best_move = None

        for move in moves:
            i, j = move
            board[i][j] = player

            value, _ = minimax(board, False)

            board[i][j] = None  # Undo move

            if value > best_value:
                best_value = value
                best_move = move

        return (best_value, best_move)
    else:
        best_value = float('inf')
        best_move = None

        for move in moves:
            i, j = move
            board[i][j] = player

            value, _ = minimax(board, True)

            board[i][j] = None  # Undo move

            if value < best_value:
                best_value = value
                best_move = move

        return (best_value, best_move)

# Test
board = [
    ['X', 'O', 'X'],
    ['O', 'X', None],
    [None, None, 'O']
]

value, move = minimax(board, True)  # X's turn (MAX)
print(f"Best move for X: {move}, value: {value}")

# Empty board test
empty_board = [[None]*3 for _ in range(3)]
value, move = minimax(empty_board, True)
print(f"Best first move: {move}, value: {value}")`  ,
    testCases: [
      { input: 'minimax(board, True)', isHidden: false, description: 'Test minimax finds best move for X' },
      { input: 'check_winner(board)', isHidden: false, description: 'Test winner detection' },
      { input: 'minimax(empty_board, True)', isHidden: false, description: 'Test minimax on empty board' }
    ],
    hints: [
      'Base case: return immediately if the game is over (win/loss/draw)',
      'MAX player (X) wants to maximize the value, MIN player (O) wants to minimize',
      'Remember to undo moves after exploring each branch (set cell back to None)'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t3-ex02',
    subjectId: 'cs406',
    topicId: 'cs406-topic-3',
    title: 'Alpha-Beta Pruning',
    difficulty: 3,
    description: `Extend Minimax with alpha-beta pruning for efficiency.

Your implementation should:
- Track alpha (best MAX can guarantee) and beta (best MIN can guarantee)
- Prune branches when alpha >= beta
- Count nodes pruned to demonstrate efficiency
- Return same result as regular minimax`,
    starterCode: `def alpha_beta(board, depth, alpha, beta, is_max_player, nodes_visited):
    # Implement alpha-beta pruning
    # Return: (value, move, nodes_visited)
    pass`,
    solution: `def check_winner(board):
    """Check if there's a winner. Returns 'X', 'O', 'draw', or None."""
    for row in board:
        if row[0] == row[1] == row[2] and row[0] is not None:
            return row[0]

    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] and board[0][col] is not None:
            return board[0][col]

    if board[0][0] == board[1][1] == board[2][2] and board[0][0] is not None:
        return board[0][0]
    if board[0][2] == board[1][1] == board[2][0] and board[0][2] is not None:
        return board[0][2]

    if all(board[i][j] is not None for i in range(3) for j in range(3)):
        return 'draw'

    return None

def get_moves(board):
    moves = []
    for i in range(3):
        for j in range(3):
            if board[i][j] is None:
                moves.append((i, j))
    return moves

def alpha_beta(board, depth, alpha, beta, is_max_player, nodes_visited={'count': 0}):
    """
    Alpha-beta pruning for Tic-Tac-Toe.
    Returns: (value, move, nodes_visited)
    """
    nodes_visited['count'] += 1

    winner = check_winner(board)

    # Terminal states
    if winner == 'X':
        return (1, None)
    elif winner == 'O':
        return (-1, None)
    elif winner == 'draw':
        return (0, None)

    moves = get_moves(board)
    player = 'X' if is_max_player else 'O'

    if is_max_player:
        best_value = float('-inf')
        best_move = None

        for move in moves:
            i, j = move
            board[i][j] = player

            value, _ = alpha_beta(board, depth + 1, alpha, beta, False, nodes_visited)

            board[i][j] = None

            if value > best_value:
                best_value = value
                best_move = move

            alpha = max(alpha, value)

            # Beta cutoff
            if beta <= alpha:
                break  # Prune remaining branches

        return (best_value, best_move)
    else:
        best_value = float('inf')
        best_move = None

        for move in moves:
            i, j = move
            board[i][j] = player

            value, _ = alpha_beta(board, depth + 1, alpha, beta, True, nodes_visited)

            board[i][j] = None

            if value < best_value:
                best_value = value
                best_move = move

            beta = min(beta, value)

            # Alpha cutoff
            if beta <= alpha:
                break  # Prune remaining branches

        return (best_value, best_move)

# Test and compare with regular minimax
board = [
    ['X', 'O', 'X'],
    ['O', None, None],
    [None, None, 'O']
]

# With alpha-beta
nodes_ab = {'count': 0}
value_ab, move_ab = alpha_beta(board, 0, float('-inf'), float('inf'), True, nodes_ab)
print(f"Alpha-Beta: value={value_ab}, move={move_ab}, nodes visited={nodes_ab['count']}")

# Compare with regular minimax
from topic3_minimax import minimax
nodes_mm = {'count': 0}

def minimax_with_count(board, is_max_player, nodes):
    nodes['count'] += 1
    winner = check_winner(board)
    if winner == 'X':
        return (1, None)
    elif winner == 'O':
        return (-1, None)
    elif winner == 'draw':
        return (0, None)

    moves = get_moves(board)
    player = 'X' if is_max_player else 'O'

    if is_max_player:
        best_value = float('-inf')
        best_move = None
        for move in moves:
            i, j = move
            board[i][j] = player
            value, _ = minimax_with_count(board, False, nodes)
            board[i][j] = None
            if value > best_value:
                best_value = value
                best_move = move
        return (best_value, best_move)
    else:
        best_value = float('inf')
        best_move = None
        for move in moves:
            i, j = move
            board[i][j] = player
            value, _ = minimax_with_count(board, True, nodes)
            board[i][j] = None
            if value < best_value:
                best_value = value
                best_move = move
        return (best_value, best_move)

value_mm, move_mm = minimax_with_count(board, True, nodes_mm)
print(f"Regular Minimax: value={value_mm}, move={move_mm}, nodes visited={nodes_mm['count']}")
print(f"Pruning efficiency: {100 * (1 - nodes_ab['count'] / nodes_mm['count']):.1f}% fewer nodes")`  ,
    testCases: [
      { input: 'alpha_beta(board, 0, -inf, +inf, True, nodes)', isHidden: false, description: 'Test alpha-beta returns same result as minimax' },
      { input: 'nodes_ab[\'count\'] < nodes_mm[\'count\']', isHidden: false, description: 'Test alpha-beta visits fewer nodes' },
      { input: 'alpha_beta with pruning', isHidden: false, description: 'Test pruning occurs when alpha >= beta' }
    ],
    hints: [
      'Alpha is the best value MAX can guarantee, beta is the best value MIN can guarantee',
      'Prune (break) when beta <= alpha because the opponent won\'t allow this branch',
      'Always update alpha in MAX nodes and beta in MIN nodes after evaluating children'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t3-ex03',
    subjectId: 'cs406',
    topicId: 'cs406-topic-3',
    title: 'Monte Carlo Tree Search (MCTS)',
    difficulty: 4,
    description: `Implement basic MCTS with UCB1 for game playing.

Your implementation should:
- Implement all four MCTS phases: selection, expansion, simulation, backpropagation
- Use UCB1 formula for selection
- Perform random playouts for simulation
- Update win statistics during backpropagation`,
    starterCode: `import math
import random

class MCTSNode:
    def __init__(self, state, parent=None):
        self.state = state
        self.parent = parent
        self.children = []
        self.visits = 0
        self.wins = 0

    def ucb1(self, c=1.41):
        # Calculate UCB1 value
        pass

def mcts_search(root_state, iterations=1000):
    # Implement MCTS
    pass`,
    solution: `import math
import random

class MCTSNode:
    def __init__(self, state, parent=None, move=None):
        self.state = state  # Game state
        self.parent = parent
        self.move = move  # Move that led to this state
        self.children = []
        self.visits = 0
        self.wins = 0
        self.untried_moves = self.get_legal_moves()

    def get_legal_moves(self):
        # Get available moves for current state
        moves = []
        for i in range(3):
            for j in range(3):
                if self.state[i][j] is None:
                    moves.append((i, j))
        return moves

    def ucb1(self, c=1.41):
        """Calculate UCB1 value for this node."""
        if self.visits == 0:
            return float('inf')

        exploitation = self.wins / self.visits
        exploration = c * math.sqrt(math.log(self.parent.visits) / self.visits)

        return exploitation + exploration

    def select_child(self):
        """Select child with highest UCB1 value."""
        return max(self.children, key=lambda child: child.ucb1())

    def expand(self):
        """Expand by adding a child for an untried move."""
        move = self.untried_moves.pop()
        i, j = move

        # Create new state
        new_state = [row[:] for row in self.state]
        player = 'X' if self.is_x_turn() else 'O'
        new_state[i][j] = player

        child = MCTSNode(new_state, parent=self, move=move)
        self.children.append(child)
        return child

    def is_x_turn(self):
        """Determine whose turn it is based on piece count."""
        x_count = sum(row.count('X') for row in self.state)
        o_count = sum(row.count('O') for row in self.state)
        return x_count == o_count

    def is_terminal(self):
        """Check if state is terminal."""
        return check_winner(self.state) is not None

    def simulate(self):
        """Random playout from this state."""
        state = [row[:] for row in self.state]
        x_turn = self.is_x_turn()

        while True:
            winner = check_winner(state)
            if winner is not None:
                if winner == 'X':
                    return 1
                elif winner == 'O':
                    return 0
                else:  # draw
                    return 0.5

            # Make random move
            moves = []
            for i in range(3):
                for j in range(3):
                    if state[i][j] is None:
                        moves.append((i, j))

            i, j = random.choice(moves)
            state[i][j] = 'X' if x_turn else 'O'
            x_turn = not x_turn

    def backpropagate(self, result):
        """Backpropagate result up the tree."""
        self.visits += 1
        self.wins += result

        if self.parent:
            # Flip result for opponent
            self.parent.backpropagate(1 - result)

def check_winner(board):
    """Check winner (same as before)."""
    for row in board:
        if row[0] == row[1] == row[2] and row[0] is not None:
            return row[0]
    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] and board[0][col] is not None:
            return board[0][col]
    if board[0][0] == board[1][1] == board[2][2] and board[0][0] is not None:
        return board[0][0]
    if board[0][2] == board[1][1] == board[2][0] and board[0][2] is not None:
        return board[0][2]
    if all(board[i][j] is not None for i in range(3) for j in range(3)):
        return 'draw'
    return None

def mcts_search(root_state, iterations=1000):
    """
    MCTS main search function.
    Returns best move from root state.
    """
    root = MCTSNode(root_state)

    for _ in range(iterations):
        node = root

        # 1. Selection
        while node.untried_moves == [] and node.children != []:
            node = node.select_child()

        # 2. Expansion
        if node.untried_moves != []:
            node = node.expand()

        # 3. Simulation
        result = node.simulate()

        # 4. Backpropagation
        node.backpropagate(result)

    # Return most visited child (most robust)
    best_child = max(root.children, key=lambda c: c.visits)
    return best_child.move

# Test
board = [
    ['X', 'O', 'X'],
    ['O', None, None],
    [None, None, 'O']
]

move = mcts_search(board, iterations=1000)
print(f"MCTS recommends move: {move}")

# Compare with minimax for validation
from topic3_minimax import minimax
value, minimax_move = minimax(board, True)
print(f"Minimax recommends: {minimax_move}")`  ,
    testCases: [
      { input: 'mcts_search(board, iterations=1000)', isHidden: false, description: 'Test MCTS finds good move' },
      { input: 'node.ucb1()', isHidden: false, description: 'Test UCB1 calculation balances exploration/exploitation' },
      { input: 'node.simulate()', isHidden: false, description: 'Test random playout returns win/loss/draw result' }
    ],
    hints: [
      'UCB1 formula: exploitation + c * sqrt(ln(parent_visits) / node_visits)',
      'Selection phase: traverse tree using UCB1 until reaching a node with unexplored children',
      'Simulation phase: perform random playout from selected node to terminal state',
      'Backpropagation: update visit counts and win statistics for all nodes in path'
    ],
    language: 'python'
  }
];
