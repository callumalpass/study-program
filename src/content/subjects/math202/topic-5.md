## Introduction

Hypothesis testing is the cornerstone of statistical inference, providing a rigorous framework for making decisions and drawing conclusions from data. It transforms the scientific method into precise mathematical statements, allowing us to test claims about populations using sample data. Whether evaluating the effectiveness of a new drug, comparing manufacturing processes, or analyzing survey results, hypothesis testing provides the tools to separate signal from noise and make evidence-based decisions.

**Why This Matters:**
Hypothesis testing is ubiquitous in scientific research, business analytics, quality control, and public policy. It enables us to quantify uncertainty, control error rates, and draw meaningful conclusions from imperfect data. Understanding hypothesis testing is essential for interpreting research findings, making data-driven decisions, and conducting your own statistical analyses across virtually every field of study.

**Learning Objectives:**
- Formulate null and alternative hypotheses for research questions
- Understand test statistics, critical regions, and decision rules
- Distinguish between Type I and Type II errors and their implications
- Calculate and interpret p-values
- Perform z-tests and t-tests for means
- Apply chi-squared tests for categorical data
- Conduct ANOVA to compare multiple groups
- Choose appropriate tests for different research scenarios

---

## Core Concepts

### The Logic of Hypothesis Testing

Hypothesis testing follows a proof-by-contradiction logic. We assume a claim (the null hypothesis) is true, then examine whether our observed data would be unusually extreme under this assumption. If the data are sufficiently unlikely given the null hypothesis, we reject it in favor of an alternative explanation.

The framework consists of:
1. **Hypotheses:** Precise statements about population parameters
2. **Test Statistic:** A value computed from sample data that measures evidence against the null
3. **Sampling Distribution:** How the test statistic behaves if the null hypothesis is true
4. **Decision Rule:** Criteria for rejecting or failing to reject the null hypothesis

### Null and Alternative Hypotheses

The **null hypothesis** $H_0$ represents the status quo, a baseline claim we test against. It typically asserts "no effect," "no difference," or a specific parameter value.

The **alternative hypothesis** $H_a$ (or $H_1$) represents what we suspect or hope to demonstrate. It's what we conclude if we reject the null.

**Forms of Alternative Hypotheses:**
- **Two-tailed:** $H_a: \mu \neq \mu_0$ (parameter differs from claimed value)
- **Right-tailed:** $H_a: \mu > \mu_0$ (parameter is greater)
- **Left-tailed:** $H_a: \mu < \mu_0$ (parameter is less)

### Test Statistics and Sampling Distributions

A **test statistic** transforms sample data into a single number measuring how far the data deviate from what we'd expect under $H_0$. Common test statistics include:

- **Z-statistic:** When population standard deviation is known
- **t-statistic:** When population standard deviation is unknown
- **Chi-squared statistic:** For categorical data and variance tests
- **F-statistic:** For comparing multiple group means

Each test statistic has a known **sampling distribution** under $H_0$, which allows us to assess how unusual our observed value is.

### Significance Level and Critical Values

The **significance level** $\alpha$ is the probability of rejecting $H_0$ when it's actually true (Type I error rate). Common choices are $\alpha = 0.05$ or $\alpha = 0.01$.

**Critical values** define the rejection region: values of the test statistic so extreme that we reject $H_0$ if our observed statistic falls there. For a two-tailed test with $\alpha = 0.05$:
- Z-test: critical values are $\pm 1.96$
- Reject $H_0$ if $|Z| > 1.96$

### P-Values

The **p-value** is the probability of obtaining a test statistic at least as extreme as what we observed, assuming $H_0$ is true. It quantifies how surprising our data would be under the null hypothesis.

**Decision rule:** Reject $H_0$ if $p\text{-value} < \alpha$

**Interpretation:**
- $p < 0.01$: Very strong evidence against $H_0$
- $0.01 \leq p < 0.05$: Strong evidence against $H_0$
- $0.05 \leq p < 0.10$: Weak evidence against $H_0$
- $p \geq 0.10$: Little or no evidence against $H_0$

### Type I and Type II Errors

| Reality → Decision ↓ | $H_0$ True | $H_0$ False |
|---------------------|------------|-------------|
| **Reject $H_0$** | Type I Error ($\alpha$) | Correct Decision (Power) |
| **Fail to Reject $H_0$** | Correct Decision ($1-\alpha$) | Type II Error ($\beta$) |

- **Type I Error:** Rejecting a true null hypothesis (false positive)
- **Type II Error:** Failing to reject a false null hypothesis (false negative)
- **Power:** $1 - \beta$, the probability of correctly rejecting a false null hypothesis

### The Hypothesis Testing Process

1. **State hypotheses:** Define $H_0$ and $H_a$ clearly
2. **Choose significance level:** Typically $\alpha = 0.05$
3. **Select test statistic:** Based on data type and assumptions
4. **Calculate test statistic:** From sample data
5. **Find p-value or critical value:** Compare to significance level
6. **Make decision:** Reject or fail to reject $H_0$
7. **State conclusion:** In context of the problem

---

## Common Tests

### Z-Tests
Used when:
- Testing means with known population standard deviation
- Large sample sizes (n > 30) by Central Limit Theorem
- Data approximately normally distributed

**One-sample z-test:**
$$Z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}$$

**Two-sample z-test:**
$$Z = \frac{(\bar{x}_1 - \bar{x}_2) - (\mu_1 - \mu_2)_0}{\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}}$$

### T-Tests
Used when:
- Population standard deviation is unknown
- Small to moderate sample sizes
- Data approximately normally distributed

**One-sample t-test:**
$$t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}$$
with $n-1$ degrees of freedom

**Two-sample t-test (equal variances):**
$$t = \frac{\bar{x}_1 - \bar{x}_2}{s_p\sqrt{\frac{1}{n_1} + \frac{1}{n_2}}}$$

**Paired t-test:**
$$t = \frac{\bar{d} - 0}{s_d / \sqrt{n}}$$
where $\bar{d}$ is the mean of paired differences

### Chi-Squared Tests
Used for categorical data:

**Goodness of fit:** Does observed distribution match expected?
$$\chi^2 = \sum \frac{(O_i - E_i)^2}{E_i}$$

**Test of independence:** Are two categorical variables related?
**Test of homogeneity:** Do different populations have the same distribution?

### ANOVA (Analysis of Variance)
Used to compare means across three or more groups.

**F-statistic:**
$$F = \frac{\text{MS}_{\text{between}}}{\text{MS}_{\text{within}}} = \frac{\text{variance between groups}}{\text{variance within groups}}$$

Large F-values suggest significant differences among group means.

---

## Common Patterns and Best Practices

### Choosing the Right Test

**Flow chart approach:**
1. **What are you comparing?** Means, proportions, or categorical relationships?
2. **How many groups?** One, two, or more?
3. **What do you know?** Is population standard deviation known?
4. **Sample size?** Large (n > 30) or small?
5. **Paired or independent?** Related measurements or separate groups?

### Assumptions Matter

Every test has assumptions. Violating them can invalidate results:
- **Normality:** Many tests assume normally distributed data or rely on Central Limit Theorem
- **Independence:** Observations must be independent
- **Equal variances:** Some two-sample tests assume homogeneity of variance
- **Random sampling:** Required for valid inference to populations

### Practical vs. Statistical Significance

A result can be **statistically significant** (p < 0.05) yet **practically insignificant** (too small to matter in real terms). Always consider:
- Effect size (how large is the difference?)
- Confidence intervals (what's the range of plausible values?)
- Context (does this matter for the application?)

### Multiple Testing Problem

Conducting many tests increases the chance of false positives. If you run 20 independent tests at $\alpha = 0.05$, you expect one Type I error on average even if all null hypotheses are true.

**Solutions:**
- Bonferroni correction: Use $\alpha/k$ for $k$ tests
- False discovery rate control
- Pre-register hypotheses before data collection

---

## Common Mistakes and Debugging

### Mistake 1: Confusing "Fail to Reject" with "Accept"
Failing to reject $H_0$ doesn't prove it's true. It means we lack sufficient evidence against it. Absence of evidence isn't evidence of absence.

### Mistake 2: P-Hacking
Running multiple analyses and only reporting significant results inflates Type I error. This includes:
- Testing multiple outcomes and reporting only significant ones
- Trying different statistical tests until one is significant
- Adding subjects until reaching significance

### Mistake 3: Misinterpreting P-Values
The p-value is NOT:
- The probability that $H_0$ is true
- The probability that results are due to chance
- The probability of replicating the result

It IS: The probability of data at least this extreme if $H_0$ is true.

### Mistake 4: Ignoring Assumptions
Using a t-test on heavily skewed data with small samples can give misleading results. Always:
- Check distributional assumptions (histograms, Q-Q plots)
- Verify independence (study design)
- Test equal variances when required (Levene's test)

### Mistake 5: One-Tailed vs. Two-Tailed Tests
Using a one-tailed test doubles your power in the chosen direction but ignores effects in the other direction. Only use one-tailed tests when:
- Theory strongly predicts a direction
- Effects in the other direction are impossible or meaningless
- You decided before seeing the data (not after!)

---

## Summary

- **Hypothesis testing** provides a framework for making decisions from data with controlled error rates
- **Null hypothesis** represents the status quo; we seek evidence against it
- **P-values** quantify how surprising our data are under $H_0$
- **Type I errors** (false positives) are controlled by significance level $\alpha$
- **Type II errors** (false negatives) are related to statistical power
- **Z-tests** are used when population standard deviation is known or samples are large
- **T-tests** are used when standard deviation must be estimated from data
- **Chi-squared tests** analyze categorical data
- **ANOVA** compares means across multiple groups
- Always check assumptions, consider practical significance, and avoid p-hacking

---

## Further Exploration

- **Bayesian Hypothesis Testing:** Alternative framework using prior beliefs and posterior probabilities
- **Nonparametric Tests:** Distribution-free alternatives when assumptions are violated
- **Bootstrap Methods:** Resampling techniques for complex scenarios
- **Sequential Analysis:** Testing that allows stopping early based on accumulating evidence
- **Effect Size Measures:** Cohen's d, odds ratios, and other measures of practical significance
