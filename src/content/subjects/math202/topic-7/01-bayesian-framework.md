## The Bayesian Framework

Statistical inference deals with learning about unknown quantities from observed data. The Bayesian approach treats these unknown quantities as random variables with probability distributions, and provides a systematic method for updating our beliefs as we observe new evidence. This framework offers an intuitive and mathematically rigorous foundation for reasoning under uncertainty.

---

## Bayes' Theorem: The Foundation

At the heart of Bayesian inference lies Bayes' theorem. In its simplest form for events, it states:

$$P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}$$

For statistical inference with parameters $\theta$ and data $x$, we write:

$$P(\theta \mid x) = \frac{P(x \mid \theta) \cdot P(\theta)}{P(x)}$$

Or more commonly, recognizing that $P(x)$ is just a normalizing constant:

$$P(\theta \mid x) \propto P(x \mid \theta) \cdot P(\theta)$$

This proportionality statement reads: "the posterior is proportional to the likelihood times the prior."

**Components explained:**

1. **Prior distribution** $P(\theta)$: Our initial beliefs about the parameter before seeing data. This could be based on previous studies, expert knowledge, or reflect complete ignorance.

2. **Likelihood** $P(x \mid \theta)$: The probability of observing the data $x$ if the parameter were $\theta$. This is the same likelihood function used in frequentist statistics.

3. **Marginal likelihood** $P(x)$: The total probability of the data, averaging over all possible parameter values: $P(x) = \int P(x \mid \theta) P(\theta) d\theta$. This ensures the posterior is a valid probability distribution.

4. **Posterior distribution** $P(\theta \mid x)$: Our updated beliefs about the parameter after observing the data. This distribution contains all our knowledge about $\theta$.

---

## A Simple Example: Coin Flipping

Suppose you find a coin and want to determine if it's fair. Let $\theta$ be the probability of heads.

**Prior:** Before flipping, you believe most coins are roughly fair, so you choose a Beta(5, 5) prior centered at 0.5.

**Data:** You flip the coin 10 times and observe 7 heads.

**Likelihood:** The number of heads follows a Binomial distribution: $P(x = 7 \mid \theta) = \binom{10}{7} \theta^7 (1-\theta)^3$

**Posterior:** Using the conjugacy of Beta and Binomial (which we'll explore later), the posterior is Beta(12, 8).

The posterior mean is $\frac{12}{12+8} = 0.6$, which is between the prior mean (0.5) and the maximum likelihood estimate (0.7). The data has updated our beliefs, but not completely overridden our prior knowledge.

---

## Bayesian vs Frequentist Paradigms

The difference between Bayesian and frequentist approaches goes deeper than just computational methods—it reflects fundamentally different philosophies about probability and inference.

### Philosophical Differences

**Frequentist perspective:**
- Probability represents long-run frequency: if we repeated the experiment infinitely, what proportion would show this outcome?
- Parameters are fixed but unknown constants
- We can never make probability statements about parameters (they either are or aren't a particular value)
- Uncertainty comes from sampling variability

**Bayesian perspective:**
- Probability represents degree of belief or plausibility
- Parameters are uncertain, so we model them with probability distributions
- We can (and should) make direct probability statements about parameters
- Uncertainty comes from our limited knowledge

### Practical Differences

**Confidence intervals vs Credible intervals:**

Frequentist 95% confidence interval: "If we repeated this procedure infinitely many times, 95% of the constructed intervals would contain the true parameter value."

Bayesian 95% credible interval: "Given the observed data, there is a 95% probability that the parameter lies in this interval."

The Bayesian interpretation is what most people think a confidence interval means—but it's technically incorrect in the frequentist framework!

**Example:** You estimate a parameter and get a 95% CI of [2.1, 3.7].

- **Frequentist says:** "Either the true parameter is in [2.1, 3.7] or it isn't. We can't say which. But our procedure is reliable: if we repeated this many times, 95% of our intervals would capture the true value."

- **Bayesian says:** "Given our data and prior beliefs, there's a 95% probability the parameter is between 2.1 and 3.7."

### Handling Prior Information

**Frequentist approach:**
- No formal mechanism to incorporate prior knowledge
- Each analysis starts from scratch
- Previous studies inform study design but not statistical inference

**Bayesian approach:**
- Prior distribution explicitly incorporates existing knowledge
- Previous posterior becomes current prior (sequential learning)
- Clear mechanism for combining multiple sources of information

### Hypothesis Testing

**Frequentist:**
- Null hypothesis significance testing (NHST)
- P-values: probability of data (or more extreme) if null hypothesis is true
- Binary decision: reject or fail to reject null
- Cannot quantify evidence for the null hypothesis

**Bayesian:**
- Direct comparison of hypotheses via Bayes factors
- Probability of hypotheses given the data
- Continuous measure of evidence
- Can accumulate evidence for or against any hypothesis

---

## The Bayesian Learning Process

Bayesian inference can be viewed as a learning algorithm:

**Step 1: Prior specification**
- Encode initial beliefs as a probability distribution
- Can be informative (strong prior knowledge) or diffuse (weak prior knowledge)

**Step 2: Data collection**
- Observe data according to some probability model

**Step 3: Posterior computation**
- Apply Bayes' theorem: multiply prior by likelihood, then normalize
- Result is a probability distribution representing updated beliefs

**Step 4: Inference**
- Extract point estimates (mean, median, mode)
- Construct credible intervals
- Make predictions for future observations
- Compare models or hypotheses

**Step 5: Iteration (optional)**
- Today's posterior becomes tomorrow's prior
- Collect more data and update again
- This sequential learning is natural in the Bayesian framework

---

## Example: Estimating Disease Prevalence

A medical researcher wants to estimate the prevalence $\theta$ of a rare disease in a population.

**Prior knowledge:** Previous studies in similar populations suggest prevalence is around 1%, but with substantial uncertainty. The researcher uses a Beta(2, 198) prior, which has mean $\frac{2}{200} = 0.01$ and allows for values between 0 and 0.05 with high probability.

**Data:** A random sample of 1000 people is tested, and 8 are found to have the disease.

**Likelihood:** The data follows a Binomial distribution: $x \mid \theta \sim \text{Binomial}(1000, \theta)$

**Posterior:** By conjugacy, the posterior is Beta(2 + 8, 198 + 992) = Beta(10, 1190).

**Results:**
- Posterior mean: $\frac{10}{1200} = 0.0083$ (0.83%)
- 95% credible interval: [0.0040, 0.0151] (0.40% to 1.51%)
- Interpretation: Given the prior information and observed data, we're 95% certain the true prevalence is between 0.40% and 1.51%

**Comparison with frequentist:**
- MLE: $\frac{8}{1000} = 0.008$
- Frequentist 95% CI: [0.0035, 0.0157]

The estimates are similar, but the interpretations differ. The Bayesian approach naturally incorporates the prior studies and provides a direct probability statement about the parameter.

---

## Advantages of the Bayesian Approach

1. **Intuitive interpretation:** Credible intervals and posterior probabilities align with how people naturally reason about uncertainty.

2. **Incorporates prior knowledge:** Previous studies, expert opinion, or domain knowledge formally enter the analysis.

3. **Exact for small samples:** No reliance on asymptotic approximations—the posterior is exact regardless of sample size.

4. **Sequential learning:** Natural framework for updating as new data arrives.

5. **Hierarchical modeling:** Excellent for complex, multi-level data structures.

6. **Decision theory:** Seamlessly integrates with decision-making under uncertainty.

7. **Handles nuisance parameters:** Can marginalize over parameters we don't care about.

---

## Challenges of the Bayesian Approach

1. **Prior specification:** Choosing appropriate priors requires thought and can be subjective (though sensitivity analysis can address this).

2. **Computational complexity:** Many problems require sophisticated computational methods (MCMC, variational inference).

3. **Communication:** Requires educating others who are trained in frequentist methods.

4. **Not always objective:** Two analysts with different priors may reach different conclusions (though they'll converge with enough data).

5. **Prior-data conflict:** If the prior and data strongly disagree, results can be sensitive to prior choice.

---

## When to Use Bayesian Methods

Bayesian inference is particularly valuable when:

- You have relevant prior information to incorporate
- Sample sizes are small and exact inference is important
- You need to make sequential updates as data arrives
- Direct probability statements about parameters are needed
- The problem involves hierarchical or complex structure
- Decision-making requires quantifying uncertainty
- You want to compare multiple models or hypotheses

---

## Key Takeaways

- **Bayes' theorem** provides a systematic way to update beliefs: posterior ∝ likelihood × prior

- **Bayesian inference** treats parameters as random variables with probability distributions

- **Philosophical difference**: Bayesian probability represents degree of belief, frequentist probability represents long-run frequency

- **Credible intervals** have direct probability interpretations, unlike confidence intervals

- **Prior distributions** formalize existing knowledge and beliefs

- **Posterior distributions** represent all we know about parameters after seeing data

- **Advantages** include intuitive interpretation, exact small-sample inference, and natural incorporation of prior knowledge

- **Challenges** include computational demands and the need for prior specification

The Bayesian framework offers a coherent, principled approach to learning from data that aligns well with how humans naturally reason about uncertainty.
