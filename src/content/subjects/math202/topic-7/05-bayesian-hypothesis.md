## Bayesian Hypothesis Testing

Traditional hypothesis testing relies on p-values and null hypothesis significance testing (NHST), which has well-documented limitations and is often misinterpreted. Bayesian hypothesis testing offers an alternative that directly quantifies evidence for competing hypotheses, allowing us to compare models and accumulate evidence in either direction.

---

## The Fundamental Difference

### Frequentist NHST

**Approach:**
1. Specify null hypothesis $H_0$ (usually "no effect")
2. Compute p-value: $P(\text{data as extreme or more} \mid H_0 \text{ true})$
3. Reject $H_0$ if $p < \alpha$ (typically 0.05)

**Problems:**
- P-values are widely misinterpreted
- Can't quantify evidence FOR the null
- Binary decision (reject/fail to reject) loses information
- Dependent on stopping rule and intentions
- "Not significant" doesn't mean "no effect"

### Bayesian Approach

**Approach:**
1. Specify competing hypotheses/models
2. Compute posterior probabilities of each hypothesis
3. Compute Bayes factor comparing evidence
4. Make decisions based on strength of evidence

**Advantages:**
- Direct probability statements about hypotheses
- Can accumulate evidence for any hypothesis
- Continuous measure of evidence strength
- Independent of stopping rule
- Can compare multiple hypotheses simultaneously

---

## Bayes Factors

The Bayes factor is the central tool for Bayesian hypothesis testing. It quantifies how much more likely the data is under one hypothesis versus another.

### Definition

For two hypotheses $H_1$ and $H_2$, the Bayes factor is:

$$BF_{12} = \frac{P(x \mid H_1)}{P(x \mid H_2)}$$

where $P(x \mid H_i)$ is the marginal likelihood of the data under hypothesis $H_i$.

**Interpretation:**
- $BF_{12} = 5$: Data is 5 times more likely under $H_1$ than $H_2$
- $BF_{12} = 0.2$: Data is 5 times more likely under $H_2$ than $H_1$
- $BF_{12} = 1$: Data equally likely under both hypotheses (no evidence either way)

### Computing Marginal Likelihood

For a hypothesis with parameter $\theta$ and prior $P(\theta \mid H)$:

$$P(x \mid H) = \int P(x \mid \theta, H) \cdot P(\theta \mid H) \, d\theta$$

This integrates over all possible parameter values, weighted by the prior. It naturally penalizes complex models (with more flexible parameters) through the integration—this is automatic Occam's razor.

### Example: Coin Fairness

You flip a coin 20 times and get 14 heads. Is the coin fair?

**Hypotheses:**
- $H_0$: Coin is fair ($\theta = 0.5$ exactly)
- $H_1$: Coin may be biased ($\theta$ can be any value)

**For $H_0$:**
$$P(x = 14 \mid H_0) = \binom{20}{14} (0.5)^{20} = 0.0370$$

**For $H_1$:** Assume Uniform(0, 1) prior on $\theta$:
$$P(x = 14 \mid H_1) = \int_0^1 \binom{20}{14} \theta^{14}(1-\theta)^6 d\theta = \frac{1}{21} = 0.0476$$

**Bayes factor:**
$$BF_{01} = \frac{0.0370}{0.0476} = 0.78$$

**Interpretation:** The data is actually slightly more likely under the biased-coin hypothesis (BF₁₀ = 1.28), but the evidence is very weak. We have essentially no evidence either way.

This contrasts with a frequentist test that might reject the null at p = 0.058 (just barely not significant), giving the misleading impression that we've learned something definitive.

---

## Prior Odds and Posterior Odds

Bayes factors combine with prior beliefs to give posterior probabilities.

### The Odds Form of Bayes' Theorem

$$\frac{P(H_1 \mid x)}{P(H_2 \mid x)} = \frac{P(H_1)}{P(H_2)} \times \frac{P(x \mid H_1)}{P(x \mid H_2)}$$

In words:
$$\text{Posterior Odds} = \text{Prior Odds} \times \text{Bayes Factor}$$

### Example: Medical Testing

A rare disease affects 1 in 1000 people. A test has 95% sensitivity and 95% specificity. You test positive. What's the probability you have the disease?

**Hypotheses:**
- $H_D$: You have the disease
- $H_{\neg D}$: You don't have the disease

**Prior odds:**
$$\frac{P(H_D)}{P(H_{\neg D})} = \frac{0.001}{0.999} = 0.001$$

**Bayes factor (positive test result):**
$$BF_{D,\neg D} = \frac{P(\text{positive} \mid H_D)}{P(\text{positive} \mid H_{\neg D})} = \frac{0.95}{0.05} = 19$$

**Posterior odds:**
$$\frac{P(H_D \mid \text{positive})}{P(H_{\neg D} \mid \text{positive})} = 0.001 \times 19 = 0.019$$

**Posterior probability:**
$$P(H_D \mid \text{positive}) = \frac{0.019}{1 + 0.019} = 0.0186 \approx 1.9\%$$

Despite the positive test, there's only a 1.9% chance you have the disease! The very low prior probability (1 in 1000) overwhelms the moderately strong evidence from the test.

---

## Interpreting Bayes Factors

Various scales have been proposed for interpreting Bayes factor strength.

### Kass and Raftery Scale

| $BF_{10}$ | Evidence for $H_1$ |
|-----------|-------------------|
| 1 to 3 | Barely worth mentioning |
| 3 to 10 | Substantial |
| 10 to 30 | Strong |
| 30 to 100 | Very strong |
| > 100 | Decisive |

### Jeffreys Scale

| $BF_{10}$ | Evidence for $H_1$ |
|-----------|-------------------|
| 1 to 3.2 | Not worth more than a bare mention |
| 3.2 to 10 | Substantial |
| 10 to 100 | Strong |
| > 100 | Decisive |

**Important:** These are rough guidelines, not rigid rules. Context matters. A BF of 3 might be decisive in one application but barely interesting in another.

---

## Point-Null Hypothesis Testing

Testing whether a parameter equals a specific value (e.g., $\theta = 0.5$) requires special handling.

### The Spike-and-Slab Prior

Assign probability mass to both the point null and a continuous alternative:

$$P(\theta) = \pi_0 \delta(\theta - \theta_0) + (1 - \pi_0) P_1(\theta)$$

where:
- $\delta(\theta - \theta_0)$ is a point mass at $\theta_0$ (the null value)
- $\pi_0$ is prior probability of null being true
- $P_1(\theta)$ is prior distribution under alternative

**Example:** Testing $H_0: \theta = 0$ vs $H_1: \theta \neq 0$

Prior: 50% chance $\theta = 0$ exactly, 50% chance $\theta \sim N(0, 1)$

After observing data, compute posterior probability of each component. If posterior probability of $\theta = 0$ increases, data supports null; if it decreases, data supports alternative.

### Savage-Dickey Ratio

For nested hypotheses, there's a computational shortcut:

$$BF_{01} = \frac{P(\theta = \theta_0 \mid x)}{P(\theta = \theta_0)}$$

The Bayes factor equals the ratio of posterior to prior density at the null value.

**Example:** Testing if a regression coefficient is zero.

Prior: $\beta \sim N(0, 1)$, so $P(\beta = 0) = 0.399$ (height of normal PDF at 0)

Posterior: $\beta \mid x \sim N(0.15, 0.3^2)$, so $P(\beta = 0 \mid x) = 1.065$

Bayes factor: $BF_{01} = \frac{1.065}{0.399} = 2.67$

Data favors non-zero coefficient by a factor of 2.67.

---

## Model Comparison

Bayes factors naturally extend to comparing complex models.

### Comparing Linear Models

**Model 1:** $y = \beta_0 + \beta_1 x_1 + \epsilon$

**Model 2:** $y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \epsilon$

Which model is better?

**Bayes factor:**
$$BF_{12} = \frac{P(y \mid M_1)}{P(y \mid M_2)}$$

This automatically penalizes Model 2 for being more complex. If $x_2$ doesn't substantially improve fit, $BF_{12} > 1$ (favors simpler model).

### Example: Polynomial Regression

Fitting temperature vs time data. Should we use linear, quadratic, or cubic model?

**Results:**
- $P(y \mid \text{linear})$: -145.2 (log scale)
- $P(y \mid \text{quadratic})$: -142.8
- $P(y \mid \text{cubic})$: -143.1

**Bayes factors (relative to linear):**
- $BF_{\text{quad,linear}} = e^{-142.8 - (-145.2)} = e^{2.4} = 11$
- $BF_{\text{cubic,linear}} = e^{-143.1 - (-145.2)} = e^{2.1} = 8.2$

Quadratic model is strongly preferred (BF = 11 vs linear). Cubic adds little beyond quadratic (and is actually slightly worse due to complexity penalty).

---

## Bayesian Model Averaging

Instead of selecting one "best" model, we can average predictions across models, weighted by posterior probability.

### Formula

$$P(\tilde{y} \mid y) = \sum_{k=1}^K P(\tilde{y} \mid M_k, y) \cdot P(M_k \mid y)$$

**Interpretation:** Predictions account for model uncertainty. If we're unsure which model is correct, we hedge by averaging.

### Example: Predictor Selection

Four candidate predictors for house price: size, age, bedrooms, location. Instead of choosing one model, consider all $2^4 = 16$ possible models.

**Posterior model probabilities:**
- Size only: 0.35
- Size + location: 0.28
- Size + bedrooms: 0.15
- All others: < 0.10 each

**Prediction for new house:**
Weight prediction from each model by its posterior probability. This is more robust than picking the single "best" model, especially when evidence doesn't strongly favor one model.

---

## Testing Inequality Constraints

Bayesian methods easily handle hypotheses like "parameter A is larger than parameter B."

### Example: A/B Test with Directional Hypothesis

**Setup:**
- $\theta_A \sim \text{Beta}(1, 1)$
- $\theta_B \sim \text{Beta}(1, 1)$
- Data: 100 visitors each, 15 conversions for A, 18 for B

**Posteriors:**
- $\theta_A \mid x \sim \text{Beta}(16, 86)$
- $\theta_B \mid x \sim \text{Beta}(19, 83)$

**Question:** Is B better than A?

Compute via simulation:
1. Draw samples from both posteriors
2. Count proportion where $\theta_B > \theta_A$

**Result:** $P(\theta_B > \theta_A \mid x) = 0.71$

**Interpretation:** There's a 71% probability that B has a higher conversion rate. This is suggestive but not conclusive. You might continue testing or implement B depending on cost/benefit considerations.

### Directional Bayes Factor

We can also compute:
$$BF = \frac{P(x \mid \theta_B > \theta_A)}{P(x \mid \theta_B \leq \theta_A)}$$

This compares evidence for the directional hypothesis against its complement.

---

## Sequential Testing and Optional Stopping

A major advantage of Bayesian methods: valid inference regardless of stopping rule.

### The Problem with Frequentist Testing

In frequentist statistics, p-values depend on your intentions:
- Did you plan to collect n = 100 samples?
- Or did you peek at the data after 50 and decide to continue?

The same data gives different p-values depending on your plan, even though the evidence is identical!

### Bayesian Solution

Bayes factors and posterior probabilities are **independent of stopping rule**. You can:
- Peek at data anytime
- Stop when you want
- Collect more data if results are ambiguous
- Change your mind about sample size

**Example:** A/B testing with sequential analysis.

Start with 100 visitors per variant:
- $P(B > A \mid x) = 0.58$ (weak evidence)
- Decision: Continue testing

Add 100 more (now 200 total):
- $P(B > A \mid x) = 0.71$ (moderate evidence)
- Decision: Continue testing

Add 100 more (now 300 total):
- $P(B > A \mid x) = 0.85$ (strong evidence)
- Decision: Implement B

This sequential approach is valid in Bayesian framework but would invalidate p-values in frequentist testing.

---

## Practical Considerations

### Advantages of Bayes Factors

1. **Quantify evidence in both directions** (for/against any hypothesis)
2. **Continuous measure** (not binary reject/fail-to-reject)
3. **Model comparison** comes naturally
4. **Intuitive interpretation** (how much more likely is data under one hypothesis?)
5. **Automatic Occam's razor** (complex models penalized)
6. **Valid sequential testing** (can stop anytime)

### Challenges

1. **Computational complexity** for complex models
2. **Sensitivity to priors** under hypotheses being compared
3. **Calibration** (what BF threshold to use?) depends on context
4. **Less familiar** to most scientists trained in NHST

### When to Use Bayes Factors

- Comparing well-defined models
- Need to accumulate evidence for or against hypotheses
- Sequential testing with flexible stopping
- Model selection and averaging
- Want to avoid p-value misinterpretation

### When to Use Estimation Instead

- Primary interest is effect size, not existence of effect
- Hypotheses aren't well-defined
- Continuous parameters (estimation often more informative than testing)

**Modern view:** Focus on estimation and effect sizes. Use hypothesis testing/model comparison when you genuinely need to choose between discrete alternatives.

---

## Key Takeaways

- **Bayes factors** quantify evidence for one hypothesis versus another

- **Posterior odds** combine prior odds and Bayes factor via multiplication

- **Point-null testing** requires spike-and-slab priors or Savage-Dickey ratio

- **Model comparison** naturally penalizes complexity through marginal likelihood

- **Model averaging** accounts for model uncertainty in predictions

- **Sequential testing** is valid in Bayesian framework (unlike frequentist)

- **Directional hypotheses** like $\theta_A > \theta_B$ are easy to test

- **Interpretation** is more intuitive than p-values but still requires care

Bayesian hypothesis testing provides a coherent framework for comparing models and accumulating evidence, avoiding many pitfalls of traditional null hypothesis significance testing while offering richer, more interpretable results.
