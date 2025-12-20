---
title: "Approximate Inference"
slug: "approximate-inference"
description: "Approximate probabilistic inference methods including sampling techniques, MCMC, Gibbs sampling, and particle filtering"
---

# Approximate Inference

When exact inference becomes computationally intractable due to network complexity, approximate inference methods offer a practical alternative. These techniques trade perfect accuracy for computational efficiency, providing estimates that are often sufficiently accurate for real-world applications. Approximate inference is essential for handling large-scale Bayesian networks and complex probabilistic models.

## Introduction to Approximate Inference

Exact inference in Bayesian networks is NP-hard for general networks, with complexity exponential in the induced width. For densely connected networks or networks with large domains, exact methods become impractical. Approximate inference methods fall into two main categories:

**1. Sampling Methods:**
- Generate random samples from the distribution
- Estimate probabilities from sample frequencies
- Become more accurate with more samples

**2. Variational Methods:**
- Formulate inference as optimization
- Find simpler distribution that approximates target
- Provide deterministic bounds on error

This subtopic focuses primarily on sampling methods, which are widely used and relatively easy to implement.

## Direct Sampling

The simplest approach generates samples by simulating the generative process encoded in the Bayesian network.

**Algorithm:**

1. Sample variables in topological order (parents before children)
2. For each variable, sample from $P(X|\text{Parents}(X))$ using parent values from current sample
3. Repeat to generate many samples

**Estimating Probabilities:**

To estimate $P(X=x)$, count the fraction of samples where $X=x$:

$$P(X=x) \approx \frac{\text{Count}(X=x)}{\text{Total samples}}$$

```python
import numpy as np
from collections import Counter

class DirectSampling:
    """Direct sampling from Bayesian network."""

    def __init__(self, network):
        """
        Args:
            network: Bayesian network with CPTs
        """
        self.network = network

    def sample_variable(self, var, parent_values):
        """
        Sample a variable given parent values.

        Args:
            var: Variable name
            parent_values: Dict of parent variable values

        Returns:
            Sampled value for the variable
        """
        # Get conditional probability from network
        probs = self.network.get_cpt(var, parent_values)

        # Sample from distribution
        values = list(probs.keys())
        probabilities = list(probs.values())

        return np.random.choice(values, p=probabilities)

    def generate_sample(self, topological_order):
        """
        Generate one complete sample.

        Args:
            topological_order: Variables in topological order

        Returns:
            Dict mapping variables to sampled values
        """
        sample = {}

        for var in topological_order:
            # Get parent values from current sample
            parent_values = {p: sample[p] for p in self.network.parents[var]}

            # Sample this variable
            sample[var] = self.sample_variable(var, parent_values)

        return sample

    def estimate_probability(self, query_var, query_value, num_samples=10000):
        """
        Estimate P(query_var = query_value) using direct sampling.

        Args:
            query_var: Variable to query
            query_value: Value to query for
            num_samples: Number of samples to generate

        Returns:
            Estimated probability
        """
        topological_order = self.network.get_topological_order()
        count = 0

        for _ in range(num_samples):
            sample = self.generate_sample(topological_order)
            if sample[query_var] == query_value:
                count += 1

        return count / num_samples


# Example usage
print("Direct sampling estimates probabilities from forward simulation")
```

**Limitations:**

Direct sampling works well for prior probabilities but is inefficient for conditional probabilities with rare evidence. If evidence has probability 0.001, we need to generate 1000 samples on average to get one consistent with evidence.

## Rejection Sampling

Rejection sampling handles evidence by generating samples and rejecting those inconsistent with observed evidence.

**Algorithm:**

1. Generate sample using direct sampling
2. If sample is consistent with evidence, keep it
3. If inconsistent, reject and generate another
4. Estimate from kept samples only

**For query** $P(X|E=e)$:

$$P(X=x|E=e) \approx \frac{\text{Count}(X=x \text{ and } E=e)}{\text{Count}(E=e)}$$

```python
def rejection_sampling(network, query_var, evidence, num_samples=10000):
    """
    Estimate P(query_var | evidence) using rejection sampling.

    Args:
        network: Bayesian network
        query_var: Variable to query
        evidence: Dict of observed variables and values
        num_samples: Number of samples to attempt

    Returns:
        Dict mapping query values to probabilities
    """
    sampler = DirectSampling(network)
    topological_order = network.get_topological_order()

    consistent_samples = []

    # Generate samples and keep consistent ones
    attempts = 0
    while len(consistent_samples) < num_samples and attempts < num_samples * 100:
        sample = sampler.generate_sample(topological_order)
        attempts += 1

        # Check consistency with evidence
        is_consistent = all(sample[var] == val for var, val in evidence.items())

        if is_consistent:
            consistent_samples.append(sample)

    # Estimate probability from consistent samples
    if not consistent_samples:
        return None  # No consistent samples found

    counter = Counter(s[query_var] for s in consistent_samples)
    total = len(consistent_samples)

    probabilities = {val: count/total for val, count in counter.items()}
    return probabilities


print("Rejection sampling handles evidence but can be inefficient")
```

**Problem:** Rejection sampling becomes extremely inefficient when evidence is unlikely. If $P(E=e) = 10^{-6}$, we need to generate a million samples on average to get one consistent sample.

## Likelihood Weighting

Likelihood weighting improves efficiency by fixing evidence variables to their observed values and weighting samples by the likelihood of evidence.

**Algorithm:**

1. Start with weight $w = 1$
2. For each variable in topological order:
   - If variable is evidence: fix to observed value, multiply $w$ by $P(X=e|\text{parents})$
   - If not evidence: sample from $P(X|\text{parents})$
3. Use weighted samples for estimation

**Weighted Estimation:**

$$P(X=x|E=e) \approx \frac{\sum_{i: X_i=x} w_i}{\sum_i w_i}$$

```python
def likelihood_weighting(network, query_var, evidence, num_samples=10000):
    """
    Estimate P(query_var | evidence) using likelihood weighting.

    Args:
        network: Bayesian network
        query_var: Variable to query
        evidence: Dict of observed variables and values
        num_samples: Number of weighted samples

    Returns:
        Dict mapping query values to probabilities
    """
    topological_order = network.get_topological_order()
    weighted_samples = []

    for _ in range(num_samples):
        sample = {}
        weight = 1.0

        for var in topological_order:
            parent_values = {p: sample[p] for p in network.parents[var]}

            if var in evidence:
                # Evidence variable: fix value and update weight
                sample[var] = evidence[var]
                prob = network.get_probability(var, evidence[var], parent_values)
                weight *= prob
            else:
                # Non-evidence: sample normally
                probs = network.get_cpt(var, parent_values)
                sample[var] = np.random.choice(list(probs.keys()), p=list(probs.values()))

        weighted_samples.append((sample[query_var], weight))

    # Compute weighted probabilities
    value_weights = {}
    for value, weight in weighted_samples:
        value_weights[value] = value_weights.get(value, 0) + weight

    total_weight = sum(value_weights.values())
    probabilities = {val: w/total_weight for val, w in value_weights.items()}

    return probabilities


print("Likelihood weighting is more efficient than rejection sampling")
```

**Advantage:** Every sample contributes to the estimate (no rejection), making it much more efficient than rejection sampling.

**Limitation:** Still struggles when evidence variables are downstream from query variables, as samples don't "explain" the evidence.

## Markov Chain Monte Carlo (MCMC)

MCMC methods generate samples by constructing a Markov chain whose stationary distribution is the target distribution. Unlike previous methods, MCMC samples are correlated but asymptotically correct.

**Gibbs Sampling:**

Gibbs sampling is a popular MCMC method that updates one variable at a time.

**Algorithm:**

1. Initialize all non-evidence variables randomly
2. Repeat:
   - Select a non-evidence variable $X$
   - Sample new value for $X$ from $P(X|\text{MarkovBlanket}(X), E=e)$
   - Replace $X$'s value in current state
3. After burn-in period, collect samples

**Markov Blanket:** The Markov blanket of $X$ includes its parents, children, and children's other parents. Given the Markov blanket, $X$ is independent of all other variables.

```python
def gibbs_sampling(network, query_var, evidence, num_samples=10000, burn_in=1000):
    """
    Estimate P(query_var | evidence) using Gibbs sampling.

    Args:
        network: Bayesian network
        query_var: Variable to query
        evidence: Dict of observed variables and values
        num_samples: Number of samples to collect
        burn_in: Number of initial samples to discard

    Returns:
        Dict mapping query values to probabilities
    """
    # Initialize state randomly (keeping evidence fixed)
    state = {}
    for var in network.variables:
        if var in evidence:
            state[var] = evidence[var]
        else:
            # Random initialization
            values = network.get_domain(var)
            state[var] = np.random.choice(values)

    samples = []
    non_evidence = [v for v in network.variables if v not in evidence]

    # Sampling iterations
    for iteration in range(burn_in + num_samples):
        # Update each non-evidence variable
        for var in non_evidence:
            # Compute P(var | MarkovBlanket(var), evidence)
            markov_blanket = network.get_markov_blanket(var)
            mb_values = {v: state[v] for v in markov_blanket}

            # Compute conditional probability for each value
            probs = network.conditional_probability(var, mb_values)

            # Sample new value
            values = list(probs.keys())
            probabilities = list(probs.values())
            state[var] = np.random.choice(values, p=probabilities)

        # Collect sample after burn-in
        if iteration >= burn_in:
            samples.append(state[query_var])

    # Estimate probability from samples
    counter = Counter(samples)
    total = len(samples)
    probabilities = {val: count/total for val, count in counter.items()}

    return probabilities


print("Gibbs sampling explores state space through local updates")
```

**Metropolis-Hastings:**

A more general MCMC algorithm that can use any proposal distribution.

**Algorithm:**

1. Initialize state
2. Repeat:
   - Propose new state $x'$ from proposal distribution $Q(x'|x)$
   - Compute acceptance probability: $\alpha = \min\left(1, \frac{P(x')Q(x|x')}{P(x)Q(x'|x)}\right)$
   - Accept with probability $\alpha$, otherwise keep current state
3. Collect samples after burn-in

```python
def metropolis_hastings(network, query_var, evidence, num_samples=10000, burn_in=1000):
    """
    Estimate P(query_var | evidence) using Metropolis-Hastings.

    Args:
        network: Bayesian network
        query_var: Variable to query
        evidence: Dict of observed variables and values
        num_samples: Number of samples to collect
        burn_in: Number of initial samples to discard

    Returns:
        Dict mapping query values to probabilities
    """
    # Initialize state
    state = {var: evidence.get(var, np.random.choice(network.get_domain(var)))
             for var in network.variables}

    samples = []
    non_evidence = [v for v in network.variables if v not in evidence]

    for iteration in range(burn_in + num_samples):
        # Propose new state (flip one random non-evidence variable)
        var_to_flip = np.random.choice(non_evidence)
        proposed_state = state.copy()
        current_value = proposed_state[var_to_flip]
        other_values = [v for v in network.get_domain(var_to_flip) if v != current_value]
        proposed_state[var_to_flip] = np.random.choice(other_values)

        # Compute acceptance probability
        current_prob = network.joint_probability(state)
        proposed_prob = network.joint_probability(proposed_state)

        # For symmetric proposal distribution (random flip)
        acceptance_prob = min(1.0, proposed_prob / current_prob)

        # Accept or reject
        if np.random.random() < acceptance_prob:
            state = proposed_state

        # Collect sample after burn-in
        if iteration >= burn_in:
            samples.append(state[query_var])

    # Estimate probability
    counter = Counter(samples)
    total = len(samples)
    probabilities = {val: count/total for val, count in counter.items()}

    return probabilities


print("Metropolis-Hastings is general MCMC with proposal distribution")
```

## Particle Filtering

Particle filtering (Sequential Monte Carlo) is designed for temporal models where we maintain a belief state over time as new evidence arrives.

**Algorithm:**

1. Initialize particles (samples) from prior
2. For each time step:
   - **Predict**: Advance each particle according to transition model
   - **Update**: Weight particles by likelihood of observation
   - **Resample**: Sample new particle set from weighted particles

**Application:** Tracking, localization, and any temporal reasoning task.

```python
class ParticleFilter:
    """Particle filter for temporal inference."""

    def __init__(self, num_particles=1000):
        """
        Args:
            num_particles: Number of particles to maintain
        """
        self.num_particles = num_particles
        self.particles = []

    def initialize(self, prior_distribution):
        """Initialize particles from prior."""
        self.particles = [prior_distribution.sample() for _ in range(self.num_particles)]

    def predict(self, transition_model):
        """Predict next state for each particle."""
        self.particles = [transition_model.sample(particle) for particle in self.particles]

    def update(self, observation, observation_model):
        """Weight particles and resample based on observation."""
        # Compute weights
        weights = [observation_model.likelihood(particle, observation)
                   for particle in self.particles]

        # Normalize weights
        total_weight = sum(weights)
        if total_weight == 0:
            # All particles have zero likelihood - reinitialize
            return

        weights = [w / total_weight for w in weights]

        # Resample
        indices = np.random.choice(len(self.particles), size=self.num_particles, p=weights)
        self.particles = [self.particles[i] for i in indices]

    def estimate(self):
        """Estimate current state from particles."""
        # For discrete states, return most common particle
        # For continuous states, return mean
        counter = Counter(self.particles)
        return counter.most_common(1)[0][0]


print("Particle filtering maintains belief state over time")
```

## Importance Sampling

Importance sampling uses samples from a proposal distribution to estimate expectations under a target distribution.

**Key Idea:** Sample from easy distribution $Q(x)$, weight by importance ratio $\frac{P(x)}{Q(x)}$.

$$E_P[f(X)] \approx \frac{1}{N}\sum_{i=1}^N f(x_i) \frac{P(x_i)}{Q(x_i)} \quad \text{where } x_i \sim Q$$

This generalizes likelihood weighting and is the foundation for many advanced sampling methods.

## Key Takeaways

1. **Approximate inference** trades accuracy for computational efficiency when exact methods are intractable
2. **Direct sampling** simulates the generative process but struggles with evidence
3. **Rejection sampling** handles evidence by rejecting inconsistent samples, but is inefficient for unlikely evidence
4. **Likelihood weighting** fixes evidence variables and weights samples, improving efficiency
5. **MCMC methods** (Gibbs sampling, Metropolis-Hastings) generate correlated samples from a Markov chain
6. **Gibbs sampling** updates one variable at a time conditioned on its Markov blanket
7. **Particle filtering** maintains a population of weighted samples for temporal inference
8. **Convergence guarantees** exist for MCMC - samples approach target distribution as iterations increase
9. **Burn-in period** is necessary for MCMC to reach the stationary distribution
10. **Sample correlation** in MCMC means more samples are needed than for independent sampling

Approximate inference makes probabilistic reasoning practical for complex real-world problems. While estimates have some error, this error can be controlled by using more samples, and the methods work even when exact inference is completely intractable. The choice of method depends on the network structure, evidence likelihood, and computational resources available.
