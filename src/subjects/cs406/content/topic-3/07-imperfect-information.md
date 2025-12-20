---
title: "Imperfect Information Games"
slug: "imperfect-information"
order: 7
---

# Imperfect Information Games

## Introduction

Throughout this topic, we have examined game-playing algorithms that assume both players have complete knowledge of the game state. Chess, checkers, and tic-tac-toe are examples of **perfect information games** where every piece's position is visible to all players. However, many of the most interesting and challenging games involve **imperfect information**, where players cannot see all aspects of the game state. Poker players don't know their opponents' hole cards. Bridge players don't know how the remaining cards are distributed. Scrabble players cannot see what tiles their opponents hold.

These games require fundamentally different reasoning strategies because players must make decisions under uncertainty about the true state of the game. This subtopic explores how AI systems handle imperfect information, building on concepts from probabilistic reasoning to create agents that can play poker, bridge, and other hidden-information games effectively.

## Types of Imperfect Information

### Hidden State Information

The most common form of imperfect information involves hidden state elements. In poker, each player can see only their own hole cards. In blackjack, the dealer's hole card is hidden. In many board games like Stratego, piece identities are hidden until captured.

The key challenge is that different actual game states may appear identical from a player's perspective. These indistinguishable states form what we call an **information set**.

### Private Actions

Some games also involve hidden actions. In simultaneous-move games like rock-paper-scissors, players choose actions without knowing their opponent's choice. In auction games, bids may be sealed. These scenarios require reasoning about what action the opponent might take given their information.

### Stochastic Elements

Games like backgammon include random elements (dice rolls) that are revealed as the game progresses. While the current state is fully visible, future states depend on chance events, creating uncertainty about how the game will unfold.

## Information Sets

An **information set** groups together all game states that are indistinguishable to a particular player given their observations. Formally, if $h$ and $h'$ are two game histories (sequences of actions leading to states), they are in the same information set for player $i$ if player $i$ has the same observations in both.

Consider Texas Hold'em poker: you hold Ace-King of spades, and the flop shows 7♣ 8♦ 2♥. Your opponent could hold any of the remaining card combinations. All possible opponent hands, combined with the known community cards and your hand, form your current information set.

The size of information sets can be enormous. In poker, even with just two players, your opponent could have any of hundreds of possible hands, and the betting history provides limited information about which hands are more likely.

## Expectiminimax Algorithm

When games include chance nodes (random events), we extend minimax with the **expectiminimax** algorithm. Instead of just MAX and MIN nodes, we add CHANCE nodes that compute expected values over possible random outcomes.

```python
def expectiminimax(state, player):
    """
    Minimax extended with chance nodes for stochastic games.

    Args:
        state: Current game state
        player: Current player ('max', 'min', or 'chance')

    Returns:
        Expected value of the state for the MAX player
    """
    if is_terminal(state):
        return utility(state)

    if player == 'max':
        best_value = float('-inf')
        for action in get_actions(state):
            successor = apply_action(state, action)
            value = expectiminimax(successor, next_player(state))
            best_value = max(best_value, value)
        return best_value

    elif player == 'min':
        best_value = float('inf')
        for action in get_actions(state):
            successor = apply_action(state, action)
            value = expectiminimax(successor, next_player(state))
            best_value = min(best_value, value)
        return best_value

    else:  # Chance node
        expected_value = 0
        for outcome, probability in get_chance_outcomes(state):
            successor = apply_outcome(state, outcome)
            value = expectiminimax(successor, next_player(state))
            expected_value += probability * value
        return expected_value
```

The key insight is that at chance nodes, we cannot choose the outcome—we must weight each possibility by its probability and sum them to get the expected value.

## Belief States and Bayesian Reasoning

To handle hidden information, agents maintain **belief states**: probability distributions over possible true game states given their observations. As the game progresses and new information becomes available, beliefs are updated using Bayes' theorem.

$$P(s \mid observations) = \frac{P(observations \mid s) \cdot P(s)}{P(observations)}$$

For example, in poker, if an opponent raises pre-flop, this updates our belief about their hand. Strong hands raise more often, so we increase the probability weight on strong hands and decrease it on weak hands.

```python
class BeliefState:
    """Maintains probability distribution over hidden information."""

    def __init__(self, possible_states):
        """Initialize uniform distribution over possible states."""
        n = len(possible_states)
        self.beliefs = {s: 1.0 / n for s in possible_states}

    def update(self, observation, likelihood_fn):
        """
        Update beliefs using Bayes' theorem.

        Args:
            observation: What was observed
            likelihood_fn: P(observation | state) function
        """
        # Compute unnormalized posteriors
        for state in self.beliefs:
            likelihood = likelihood_fn(observation, state)
            self.beliefs[state] *= likelihood

        # Normalize
        total = sum(self.beliefs.values())
        if total > 0:
            for state in self.beliefs:
                self.beliefs[state] /= total

    def expected_value(self, value_fn):
        """Compute expected value over belief distribution."""
        return sum(
            prob * value_fn(state)
            for state, prob in self.beliefs.items()
        )
```

## Nash Equilibrium and Mixed Strategies

In imperfect information games, optimal play often requires **mixed strategies**—randomizing over possible actions rather than always choosing the same action in a given situation.

Consider a simplified poker scenario: you can either bluff (bet with a weak hand) or fold. If you always bluff with weak hands, opponents will learn to call. If you never bluff, opponents will always fold to your bets with strong hands. The optimal strategy is to bluff some fraction of the time, making your betting pattern unpredictable.

A **Nash equilibrium** is a strategy profile where no player can improve their expected payoff by unilaterally changing their strategy. In two-player zero-sum games, Nash equilibrium strategies guarantee a minimum expected value regardless of the opponent's strategy.

```python
def compute_ev_calling(pot, bet, win_probability):
    """
    Expected value of calling a bet.

    Args:
        pot: Current pot size
        bet: Amount to call
        win_probability: Probability of winning at showdown

    Returns:
        Expected value of calling
    """
    win_amount = pot + bet
    ev = win_probability * win_amount - (1 - win_probability) * bet
    return ev

def optimal_bluff_frequency(pot, bet):
    """
    Calculate optimal bluff frequency to make opponent indifferent.

    In Nash equilibrium, bluff frequency should make opponent's
    EV of calling equal to EV of folding (which is 0).
    """
    # Opponent calls bet to win pot + bet
    # If we bluff with probability b:
    # EV(call) = b * (pot + bet) - (1 - b) * bet
    # Set EV(call) = 0:
    # b * pot + b * bet - bet + b * bet = 0
    # b * (pot + 2 * bet) = bet
    # b = bet / (pot + 2 * bet)
    return bet / (pot + 2 * bet)
```

## Solving Large Imperfect Information Games

Modern poker AI uses **Counterfactual Regret Minimization (CFR)** to compute approximate Nash equilibria. CFR iteratively improves strategies by tracking "regret"—how much better each action would have been compared to the chosen action—and adjusting action probabilities accordingly.

The algorithm handles the enormous state spaces by using **information set abstraction**, grouping similar situations together. For example, holding Ace-King on a low board might be grouped with other "strong draw" hands rather than tracked separately.

Key techniques include:

1. **Card abstraction**: Grouping strategically similar card combinations
2. **Betting abstraction**: Limiting betting options to discrete sizes
3. **Action abstraction**: Reducing the number of legal actions considered
4. **Monte Carlo sampling**: Sampling game trajectories rather than exhaustive search

## Practical Example: Simplified Poker Strategy

```python
def poker_decision(hand_strength, pot_odds, opponent_tendency):
    """
    Simple poker decision framework.

    Args:
        hand_strength: 0-1 representing hand equity
        pot_odds: bet_to_call / (pot + bet_to_call)
        opponent_tendency: how often opponent bluffs (0-1)

    Returns:
        Recommended action
    """
    # Adjust required equity based on pot odds
    required_equity = pot_odds

    # Adjust for opponent bluffing tendency
    # If opponent bluffs often, we need less equity to call
    adjusted_equity = hand_strength * (1 + opponent_tendency * 0.2)

    if adjusted_equity > required_equity + 0.15:
        return "RAISE"  # Value bet
    elif adjusted_equity > required_equity:
        return "CALL"
    elif random.random() < optimal_bluff_frequency(pot, bet):
        return "BLUFF_RAISE"  # Semi-balanced bluffing
    else:
        return "FOLD"
```

## Key Takeaways

- **Imperfect information** fundamentally changes game-playing strategy, requiring probabilistic reasoning about hidden state
- **Information sets** group indistinguishable game states; agents must reason over entire information sets, not individual states
- **Expectiminimax** extends minimax to handle chance nodes by computing expected values
- **Belief states** maintain probability distributions over hidden information, updated via Bayesian inference
- **Nash equilibrium** provides optimal mixed strategies where randomization prevents exploitation
- **CFR and abstraction** enable solving large imperfect information games like Texas Hold'em
- Real-world applications include poker bots, trading systems, and any decision-making under uncertainty about other agents' private information

## Common Mistakes

1. **Treating imperfect information like perfect information**: Using pure minimax ignores the critical role of uncertainty and mixed strategies
2. **Ignoring opponent modeling**: While Nash equilibrium guarantees minimum performance, exploiting opponent weaknesses often yields better results
3. **Over-bluffing or under-bluffing**: Deviating too far from equilibrium bluff frequencies makes you exploitable
4. **Static belief states**: Failing to update beliefs as new information arrives leads to suboptimal decisions
