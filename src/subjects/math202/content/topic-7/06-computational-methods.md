## Computational Methods for Bayesian Inference

While conjugate priors allow analytical posterior computation for simple models, most real-world problems require computational methods. The posterior distribution $P(\theta \mid x) \propto P(x \mid \theta) P(\theta)$ is often known only up to a normalizing constant, and the integral needed to compute this constant may be intractable. This subtopic introduces the fundamental computational techniques that make Bayesian inference practical for complex models.

---

## Why We Need Computation

### The Normalization Problem

Bayes' theorem states:
$$P(\theta \mid x) = \frac{P(x \mid \theta) P(\theta)}{P(x)}$$

We can easily compute the numerator: likelihood × prior. But the denominator requires:
$$P(x) = \int P(x \mid \theta) P(\theta) \, d\theta$$

For complex models with many parameters, this integral is often impossible to compute analytically.

### Intractable Posteriors

Even when we can normalize the posterior, we often need to compute expectations:
$$E[f(\theta) \mid x] = \int f(\theta) P(\theta \mid x) \, d\theta$$

For high-dimensional $\theta$ or complex $f$, analytical solutions are rare.

### The Computational Solution

Instead of computing posteriors analytically, we can:
1. **Draw samples** from the posterior distribution
2. **Approximate** posterior quantities using these samples
3. **Simulate** to estimate integrals

This is the foundation of modern Bayesian computation.

---

## Monte Carlo Fundamentals

Monte Carlo methods use random sampling to approximate quantities that are hard to compute directly.

### Basic Idea

To approximate $E[f(\theta)]$:
1. Draw samples $\theta^{(1)}, \theta^{(2)}, \ldots, \theta^{(n)}$ from $P(\theta)$
2. Approximate: $E[f(\theta)] \approx \frac{1}{n} \sum_{i=1}^n f(\theta^{(i)})$

By the Law of Large Numbers, this converges to the true expectation as $n \to \infty$.

### Example: Estimating π

We can estimate $\pi$ by Monte Carlo:
1. Draw random points $(x, y)$ uniformly in $[0, 1]^2$
2. Count how many fall inside the quarter-circle: $x^2 + y^2 \leq 1$
3. Ratio × 4 approximates $\pi$

With 10,000 samples: $\pi \approx 3.1416$ (true value: 3.14159...)

### Challenge for Bayesian Inference

We want samples from the **posterior** $P(\theta \mid x)$, but we only know it up to a constant. We need methods that can sample from unnormalized distributions.

---

## Markov Chain Monte Carlo (MCMC)

MCMC is the workhorse of Bayesian computation. It constructs a Markov chain whose stationary distribution is the target posterior.

### Core Concept

A **Markov chain** is a sequence of random variables where each depends only on the previous one:
$$P(\theta^{(t+1)} \mid \theta^{(1)}, \ldots, \theta^{(t)}) = P(\theta^{(t+1)} \mid \theta^{(t)})$$

**Key property:** If we design the transition probabilities correctly, the chain will eventually "forget" its starting point and produce samples from the target distribution.

### The MCMC Algorithm (General)

1. Start with initial value $\theta^{(0)}$
2. For $t = 1, 2, \ldots, N$:
   - Generate $\theta^{(t)}$ from $\theta^{(t-1)}$ using a transition rule
   - This transition is designed so the chain converges to $P(\theta \mid x)$
3. After "burn-in" period, use samples as draws from posterior

### Burn-in and Convergence

**Burn-in:** Initial samples before the chain reaches the stationary distribution. These are discarded.

**Convergence diagnostics:**
- Trace plots: visualize the chain's behavior
- Multiple chains: start from different places, should converge to same distribution
- Gelman-Rubin statistic: compares within-chain and between-chain variance

---

## Metropolis-Hastings Algorithm

The Metropolis-Hastings algorithm is a general MCMC method that only requires evaluating the posterior up to a constant.

### Algorithm

1. Initialize $\theta^{(0)}$
2. For $t = 1, 2, \ldots, N$:

   a. **Propose** a new value: $\theta^* \sim q(\theta^* \mid \theta^{(t-1)})$

   b. **Compute acceptance probability:**
   $$\alpha = \min\left(1, \frac{P(\theta^* \mid x) \cdot q(\theta^{(t-1)} \mid \theta^*)}{P(\theta^{(t-1)} \mid x) \cdot q(\theta^* \mid \theta^{(t-1)})}\right)$$

   c. **Accept or reject:**
   - With probability $\alpha$: $\theta^{(t)} = \theta^*$ (accept)
   - With probability $1-\alpha$: $\theta^{(t)} = \theta^{(t-1)}$ (reject)

### Why It Works

The acceptance ratio ensures **detailed balance:**
$$P(\theta^{(t-1)} \mid x) \cdot P(\theta^* \mid \theta^{(t-1)}) = P(\theta^* \mid x) \cdot P(\theta^{(t-1)} \mid \theta^*)$$

This guarantees the chain's stationary distribution is the target posterior.

**Key insight:** The normalizing constant cancels in the acceptance ratio! We only need to evaluate the unnormalized posterior.

### Example: Normal Distribution

Estimate mean $\mu$ of Normal data with unknown variance.

**Setup:**
- Data: $x_1, \ldots, x_n \sim N(\mu, 1)$
- Prior: $\mu \sim N(0, 10)$
- Proposal: $\mu^* \sim N(\mu^{(t-1)}, 0.5)$ (random walk)

**Acceptance ratio:**
$$\alpha = \min\left(1, \frac{P(x \mid \mu^*) P(\mu^*)}{P(x \mid \mu^{(t-1)}) P(\mu^{(t-1)})}\right)$$

Run for 10,000 iterations, discard first 1,000 (burn-in), use remaining 9,000 as posterior samples.

### Choosing the Proposal Distribution

**Too narrow:** High acceptance rate but slow exploration (chain moves in tiny steps)

**Too wide:** Low acceptance rate, chain stuck in one place

**Optimal:** Acceptance rate around 23-44% (for many problems)

**Adaptive methods:** Tune proposal variance during burn-in to achieve target acceptance rate.

---

## Gibbs Sampling

Gibbs sampling is a special case of MCMC for multiparameter models where we can sample from conditional distributions.

### The Algorithm

For parameters $\theta = (\theta_1, \theta_2, \ldots, \theta_p)$:

1. Initialize $\theta^{(0)} = (\theta_1^{(0)}, \theta_2^{(0)}, \ldots, \theta_p^{(0)})$

2. For $t = 1, 2, \ldots, N$:
   - Sample $\theta_1^{(t)} \sim P(\theta_1 \mid \theta_2^{(t-1)}, \ldots, \theta_p^{(t-1)}, x)$
   - Sample $\theta_2^{(t)} \sim P(\theta_2 \mid \theta_1^{(t)}, \theta_3^{(t-1)}, \ldots, \theta_p^{(t-1)}, x)$
   - ...
   - Sample $\theta_p^{(t)} \sim P(\theta_p \mid \theta_1^{(t)}, \ldots, \theta_{p-1}^{(t)}, x)$

### Why Gibbs?

**Advantages:**
- No tuning required (no proposal distribution)
- Always accepts (no rejection step)
- Often faster than Metropolis-Hastings

**Requirements:**
- Must be able to sample from each conditional distribution
- Works best when conditionals are standard distributions

### Example: Normal with Unknown Mean and Variance

Data: $x_1, \ldots, x_n \sim N(\mu, \sigma^2)$

Priors:
- $\mu \sim N(\mu_0, \tau_0^2)$
- $\sigma^2 \sim \text{Inverse-Gamma}(\alpha_0, \beta_0)$

**Conditionals:**

$$\mu \mid \sigma^2, x \sim N\left(\frac{\frac{\mu_0}{\tau_0^2} + \frac{n\bar{x}}{\sigma^2}}{\frac{1}{\tau_0^2} + \frac{n}{\sigma^2}}, \left(\frac{1}{\tau_0^2} + \frac{n}{\sigma^2}\right)^{-1}\right)$$

$$\sigma^2 \mid \mu, x \sim \text{Inverse-Gamma}\left(\alpha_0 + \frac{n}{2}, \beta_0 + \frac{1}{2}\sum_{i=1}^n (x_i - \mu)^2\right)$$

Both are standard distributions we can sample from easily!

**Gibbs sampling:**
1. Start with initial $\mu^{(0)}, \sigma^{2(0)}$
2. Alternate sampling from conditionals
3. After burn-in, we have joint posterior samples

### Blocking

When parameters are highly correlated, Gibbs can be slow. **Block Gibbs sampling** updates correlated parameters jointly:

Instead of updating $\theta_1$, then $\theta_2$ separately, update $(\theta_1, \theta_2)$ together from their joint conditional.

---

## Practical MCMC: Diagnostics and Best Practices

### Trace Plots

Plot parameter values over iterations to visualize chain behavior.

**Good trace plot:**
- Random scatter around mean
- No trends or patterns
- Mixes well across parameter space

**Bad trace plots:**
- Trends (not converged)
- Stickiness (poor mixing)
- Multimodality without transitions

### Effective Sample Size

MCMC samples are autocorrelated (each depends on the previous). **Effective sample size (ESS)** estimates how many independent samples they're equivalent to.

$$\text{ESS} \approx \frac{n}{1 + 2\sum_{k=1}^\infty \rho_k}$$

where $\rho_k$ is autocorrelation at lag $k$.

**Example:** 10,000 MCMC samples might have ESS = 2,000 (equivalent to 2,000 independent samples).

### Thinning

Keeping every $k$th sample reduces autocorrelation and storage.

**Example:** From 10,000 samples, keep every 10th → 1,000 nearly-independent samples.

**Modern view:** Thinning rarely necessary; better to run longer chains.

### Multiple Chains

Run several chains from different starting points. They should all converge to the same distribution.

**Gelman-Rubin diagnostic ($\hat{R}$):**
- Compares between-chain and within-chain variance
- $\hat{R} \approx 1$ indicates convergence
- $\hat{R} > 1.1$ suggests more burn-in needed

### Recommendations

1. **Run multiple chains** from dispersed starting points
2. **Check trace plots** for convergence and mixing
3. **Use convergence diagnostics** ($\hat{R}$, ESS)
4. **Discard burn-in** (typically 50% of samples)
5. **Collect enough samples** (ESS > 1000 for stable estimates)
6. **Monitor acceptance rates** (23-44% for Metropolis-Hastings)

---

## Beyond Basic MCMC

### Hamiltonian Monte Carlo (HMC)

Uses gradient information to propose moves that follow the geometry of the posterior.

**Advantages:**
- Much more efficient than random walk Metropolis
- Especially good for high-dimensional problems
- Less tuning required

**Requirements:**
- Need to compute gradients of log posterior
- More complex to implement (use software like Stan)

**When to use:** Complex hierarchical models, high dimensions (> 10 parameters)

### No-U-Turn Sampler (NUTS)

An adaptive version of HMC that automatically tunes step size and number of steps.

**Why it matters:** NUTS is the default in Stan and has made Bayesian inference much more accessible for complex models.

### Variational Inference

An alternative to MCMC that approximates the posterior with a simpler distribution.

**Approach:**
1. Choose a family of distributions $Q$ (e.g., multivariate Normal)
2. Find member of $Q$ closest to true posterior (minimize KL divergence)
3. Use this approximation for inference

**Advantages:**
- Much faster than MCMC
- Scales to very large datasets
- Deterministic (no random sampling)

**Disadvantages:**
- Approximate (not exact samples from posterior)
- May underestimate uncertainty
- Requires optimization expertise

**When to use:** Huge datasets, need for speed, exploratory analysis

---

## Software for Bayesian Computation

### Stan

**Language:** Probabilistic programming language
**Sampler:** NUTS (HMC variant)
**Pros:** Very efficient, excellent diagnostics, wide model coverage
**Cons:** Steep learning curve, requires compilation

**Example:**
```stan
data {
  int<lower=0> N;
  vector[N] x;
}
parameters {
  real mu;
  real<lower=0> sigma;
}
model {
  mu ~ normal(0, 10);
  sigma ~ inv_gamma(2, 3);
  x ~ normal(mu, sigma);
}
```

### PyMC

**Language:** Python library
**Sampler:** Multiple (including NUTS)
**Pros:** Pythonic interface, good documentation, flexible
**Cons:** Can be slower than Stan for some models

### JAGS

**Language:** Similar to BUGS
**Sampler:** Gibbs + Metropolis-Hastings
**Pros:** Mature, simple syntax, widely used
**Cons:** Slower than Stan/PyMC for complex models

### Choosing Software

- **Learning:** JAGS or PyMC (easier syntax)
- **Production/Research:** Stan (most efficient)
- **Python ecosystem:** PyMC
- **R ecosystem:** Stan via rstan

---

## Example: Logistic Regression

Predict binary outcome from predictors using MCMC.

**Model:**
$$\text{logit}(p_i) = \beta_0 + \beta_1 x_{i1} + \beta_2 x_{i2}$$
$$y_i \sim \text{Bernoulli}(p_i)$$

**Priors:**
$$\beta_j \sim N(0, 5)$$

**Why MCMC needed:** No conjugacy, posterior is not a standard distribution.

**Algorithm:** Use Gibbs sampling or Metropolis-Hastings
1. Initialize $\beta^{(0)}$
2. Propose new $\beta^*$ from random walk proposal
3. Compute acceptance ratio using logistic likelihood
4. Accept/reject
5. Repeat for 10,000 iterations

**Results:** Posterior samples for each $\beta_j$
- Point estimates (posterior means)
- Credible intervals (quantiles of samples)
- Predictions for new data

---

## Key Takeaways

- **MCMC** constructs chains whose stationary distribution is the target posterior

- **Metropolis-Hastings** requires only unnormalized posterior evaluation

- **Gibbs sampling** alternates sampling from conditional distributions

- **Burn-in** discards early samples before convergence

- **Diagnostics** (trace plots, $\hat{R}$, ESS) check convergence and mixing

- **Multiple chains** from different starts should converge to same distribution

- **Modern samplers** (NUTS/HMC) are much more efficient than basic methods

- **Software** (Stan, PyMC, JAGS) implements sophisticated MCMC for complex models

- **Variational inference** offers faster but approximate alternative to MCMC

Computational methods have transformed Bayesian statistics from a theoretical framework to a practical tool for real-world inference. Understanding the basics of MCMC enables you to fit complex models that would be intractable with analytical methods alone.
