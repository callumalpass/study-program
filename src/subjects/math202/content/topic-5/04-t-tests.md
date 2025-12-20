---
id: math202-t5-t-tests
title: "t-Tests"
order: 4
---

# T-Tests for Means

The t-test is one of the most widely used statistical tests in practice. Unlike the z-test, which requires knowing the population standard deviation, the t-test uses the sample standard deviation, making it applicable to the vast majority of real-world scenarios. Understanding the different types of t-tests and when to use each is essential for practical data analysis.

## Why T-Tests Instead of Z-Tests?

In most real situations, we don't know the population standard deviation $\sigma$. We must estimate it from the sample using the sample standard deviation $s$. This introduces additional uncertainty beyond sampling variability.

**Key difference:**
- **Z-test:** Uses known $\sigma$; test statistic follows standard normal distribution
- **T-test:** Uses estimated $s$; test statistic follows t-distribution with heavier tails

The t-distribution accounts for the extra uncertainty from estimating $\sigma$. As sample size increases, the t-distribution approaches the normal distribution.

## The T-Distribution

The t-distribution is characterized by its **degrees of freedom** (df), which depend on sample size:

**Properties:**
- Symmetric and bell-shaped like the normal distribution
- Heavier tails than normal (more probability in extremes)
- Approaches standard normal as df → ∞
- Different critical values for different df

**Degrees of freedom:**
- One-sample t-test: $df = n - 1$
- Two-sample t-test: $df$ varies by method
- Paired t-test: $df = n - 1$ (where $n$ is number of pairs)

**Critical values increase as df decreases:**
| df | $t_{0.025}$ (two-tailed, $\alpha=0.05$) |
|----|----------------------------------------|
| 5 | 2.571 |
| 10 | 2.228 |
| 20 | 2.086 |
| 30 | 2.042 |
| ∞ | 1.96 (z-value) |

## One-Sample T-Test

Tests whether a population mean equals a hypothesized value when $\sigma$ is unknown.

### Hypotheses

**Two-tailed:**
- $H_0: \mu = \mu_0$
- $H_a: \mu \neq \mu_0$

**Right-tailed:**
- $H_0: \mu = \mu_0$
- $H_a: \mu > \mu_0$

**Left-tailed:**
- $H_0: \mu = \mu_0$
- $H_a: \mu < \mu_0$

### Test Statistic

$$t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}$$

where:
- $\bar{x}$ = sample mean
- $\mu_0$ = hypothesized population mean
- $s$ = sample standard deviation
- $n$ = sample size
- df = $n - 1$

### Assumptions

1. **Random sample** from the population
2. **Independence** of observations
3. **Approximately normal distribution** OR large sample size
   - For $n \geq 30$: CLT makes t-test robust to non-normality
   - For $n < 30$: Check for severe skewness or outliers

### Worked Example: Coffee Shop Wait Times

**Problem:** A coffee shop claims average wait time is 5 minutes. A customer suspects it's longer and times 12 randomly selected orders:

Wait times (minutes): 5.2, 6.1, 4.8, 7.3, 5.9, 6.5, 5.4, 6.8, 7.1, 5.6, 6.2, 5.8

Test at $\alpha = 0.05$ whether mean wait time exceeds 5 minutes.

**Step 1: Calculate sample statistics**
$$\bar{x} = \frac{5.2 + 6.1 + ... + 5.8}{12} = 6.058 \text{ minutes}$$

$$s = 0.739 \text{ minutes (using calculator or software)}$$

**Step 2: Hypotheses**
- $H_0: \mu = 5$
- $H_a: \mu > 5$ (customer suspects longer waits)
- Right-tailed test

**Step 3: Test statistic**
$$t = \frac{6.058 - 5}{0.739/\sqrt{12}} = \frac{1.058}{0.213} = 4.97$$

with $df = 12 - 1 = 11$

**Step 4: Decision**

**Critical value:** For right-tailed test, $\alpha = 0.05$, $df = 11$: $t_{0.05, 11} = 1.796$

Since $4.97 > 1.796$, we reject $H_0$.

**P-value:** From t-table or software, $p < 0.001$ (very small)

**Step 5: Conclusion**
At the 5% significance level, there is very strong evidence that the mean wait time exceeds 5 minutes. The observed mean of 6.06 minutes is significantly higher than claimed.

**95% Confidence Interval:**
$$6.058 \pm 2.201 \cdot 0.213 = 6.058 \pm 0.469 = (5.589, 6.527)$$

The true mean wait time is estimated between 5.6 and 6.5 minutes.

## Two-Sample T-Test (Independent Samples)

Compares means from two independent populations when variances are unknown.

### Two Approaches Based on Variance Assumption

**1. Pooled t-test (equal variances assumed):**
Assumes $\sigma_1^2 = \sigma_2^2$ and uses pooled variance estimate.

**2. Welch's t-test (unequal variances):**
Does not assume equal variances; adjusts df accordingly. More conservative and generally safer.

### Pooled Two-Sample T-Test

**Hypotheses:**
- $H_0: \mu_1 = \mu_2$
- $H_a: \mu_1 \neq \mu_2$ (or $>$ or $<$)

**Test statistic:**
$$t = \frac{\bar{x}_1 - \bar{x}_2}{s_p \sqrt{\frac{1}{n_1} + \frac{1}{n_2}}}$$

**Pooled standard deviation:**
$$s_p = \sqrt{\frac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2}}$$

**Degrees of freedom:** $df = n_1 + n_2 - 2$

### Assumptions

1. **Independent random samples** from each population
2. **Independent groups** (not paired or matched)
3. **Approximately normal distributions** in both populations
4. **Equal population variances** (for pooled test)

**Testing equal variances:** Use F-test or Levene's test, or examine ratio $s_1^2 / s_2^2$ (should be between 0.5 and 2).

### Worked Example: Comparing Study Methods

**Problem:** An instructor compares two study methods.

Group A (traditional): $n_1 = 15$, $\bar{x}_1 = 82$, $s_1 = 7$
Group B (new method): $n_2 = 12$, $\bar{x}_2 = 88$, $s_2 = 6$

Test at $\alpha = 0.05$ whether the methods produce different mean scores.

**Step 1: Check equal variance assumption**
$$\frac{s_1^2}{s_2^2} = \frac{49}{36} = 1.36$$

This is between 0.5 and 2, so equal variance assumption is reasonable.

**Step 2: Hypotheses**
- $H_0: \mu_A = \mu_B$
- $H_a: \mu_A \neq \mu_B$
- Two-tailed test

**Step 3: Calculate pooled standard deviation**
$$s_p = \sqrt{\frac{(15-1)(7^2) + (12-1)(6^2)}{15 + 12 - 2}} = \sqrt{\frac{14(49) + 11(36)}{25}} = \sqrt{\frac{686 + 396}{25}} = \sqrt{43.28} = 6.58$$

**Step 4: Test statistic**
$$t = \frac{82 - 88}{6.58\sqrt{\frac{1}{15} + \frac{1}{12}}} = \frac{-6}{6.58\sqrt{0.0667 + 0.0833}} = \frac{-6}{6.58(0.387)} = \frac{-6}{2.55} = -2.35$$

with $df = 15 + 12 - 2 = 25$

**Step 5: Decision**

**Critical values:** For two-tailed test, $\alpha = 0.05$, $df = 25$: $\pm 2.060$

Since $|{-2.35}| = 2.35 > 2.060$, we reject $H_0$.

**P-value:** From t-table, $0.02 < p < 0.05$ (approximately 0.027)

**Step 6: Conclusion**
At the 5% significance level, there is significant evidence that the two study methods produce different mean scores. The new method (B) appears to yield higher scores by an average of 6 points.

**95% Confidence Interval for difference:**
$$-6 \pm 2.060(2.55) = -6 \pm 5.25 = (-11.25, -0.75)$$

We're 95% confident the new method improves scores by 0.75 to 11.25 points.

### Welch's T-Test (Unequal Variances)

When variances appear unequal, use Welch's t-test:

**Test statistic:** (same formula)
$$t = \frac{\bar{x}_1 - \bar{x}_2}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}$$

**Degrees of freedom (Welch-Satterthwaite equation):**
$$df = \frac{\left(\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}\right)^2}{\frac{(s_1^2/n_1)^2}{n_1-1} + \frac{(s_2^2/n_2)^2}{n_2-1}}$$

This typically gives non-integer df; use software or round down.

## Paired T-Test

Used when comparing two measurements on the same subjects or matched pairs (e.g., before/after, twins, matched controls).

### Key Difference from Two-Sample T-Test

**Two-sample:** Independent groups (different subjects)
**Paired:** Related measurements (same subjects or matched pairs)

**Example scenarios:**
- Before and after treatment on same patients
- Left hand vs. right hand measurements
- Husband and wife pairs
- Pre-test and post-test scores

### Why Pairing Matters

Pairing removes between-subject variability, increasing power to detect treatment effects.

**Example:** Testing a weight loss program

**Unpaired analysis:** Compares weight of treatment group to control group. High variability because people start at different weights.

**Paired analysis:** Compares weight before vs. after for each person. Focuses on individual changes, reducing noise.

### Hypotheses

- $H_0: \mu_d = 0$ (mean difference is zero)
- $H_a: \mu_d \neq 0$ (or $>$ or $<$)

where $\mu_d$ is the mean of paired differences

### Test Statistic

$$t = \frac{\bar{d} - 0}{s_d / \sqrt{n}}$$

where:
- $\bar{d}$ = mean of differences $d_i = x_{1i} - x_{2i}$
- $s_d$ = standard deviation of differences
- $n$ = number of pairs
- $df = n - 1$

### Assumptions

1. **Paired measurements** (not independent groups)
2. **Random sample** of pairs
3. **Differences approximately normally distributed**

### Worked Example: Blood Pressure Medication

**Problem:** A medication's effect on systolic blood pressure is tested. Ten patients have BP measured before and after 4 weeks of treatment:

| Patient | Before | After | Difference (Before - After) |
|---------|--------|-------|-----------------------------|
| 1 | 145 | 138 | 7 |
| 2 | 152 | 145 | 7 |
| 3 | 138 | 135 | 3 |
| 4 | 160 | 148 | 12 |
| 5 | 155 | 150 | 5 |
| 6 | 142 | 140 | 2 |
| 7 | 148 | 142 | 6 |
| 8 | 156 | 151 | 5 |
| 9 | 150 | 145 | 5 |
| 10 | 147 | 143 | 4 |

Does the medication significantly reduce blood pressure? Test at $\alpha = 0.05$.

**Step 1: Calculate difference statistics**
$$\bar{d} = \frac{7 + 7 + 3 + 12 + 5 + 2 + 6 + 5 + 5 + 4}{10} = \frac{56}{10} = 5.6$$

$$s_d = 2.84 \text{ (using calculator)}$$

**Step 2: Hypotheses**
- $H_0: \mu_d = 0$ (no reduction)
- $H_a: \mu_d > 0$ (reduction in BP)
- Right-tailed test

**Step 3: Test statistic**
$$t = \frac{5.6 - 0}{2.84/\sqrt{10}} = \frac{5.6}{0.898} = 6.24$$

with $df = 10 - 1 = 9$

**Step 4: Decision**

**Critical value:** For right-tailed test, $\alpha = 0.05$, $df = 9$: $t_{0.05, 9} = 1.833$

Since $6.24 > 1.833$, we strongly reject $H_0$.

**P-value:** $p < 0.001$ (very strong evidence)

**Step 5: Conclusion**
There is very strong evidence that the medication reduces systolic blood pressure. The mean reduction is 5.6 mmHg with 95% CI:

$$5.6 \pm 2.262(0.898) = 5.6 \pm 2.03 = (3.57, 7.63)$$

We're 95% confident the medication reduces BP by 3.6 to 7.6 mmHg.

**Comparison to unpaired analysis:**
If we incorrectly used a two-sample t-test (ignoring pairing), we would have lower power because we'd include between-subject variability. The paired test is more appropriate and powerful.

## Choosing the Right T-Test

**Decision flowchart:**

1. **One group or two groups?**
   - One group → One-sample t-test
   - Two groups → Continue to #2

2. **Are measurements paired or independent?**
   - Paired (same subjects, matched) → Paired t-test
   - Independent (different subjects) → Continue to #3

3. **Are population variances equal?**
   - Probably equal (ratio 0.5 to 2) → Pooled two-sample t-test
   - Probably unequal → Welch's t-test

**When in doubt, use Welch's t-test** — it's more conservative and doesn't require equal variances.

## Common Mistakes and Best Practices

### Mistake 1: Using Paired Test for Independent Groups

**Wrong:** Using paired t-test on treatment vs. control groups (different people)

**Right:** Use two-sample t-test for independent groups

### Mistake 2: Using Two-Sample Test for Paired Data

**Wrong:** Using two-sample t-test on before/after measurements

**Right:** Calculate differences and use paired t-test. This dramatically increases power.

### Mistake 3: Ignoring Normality Assumption with Small Samples

**Problem:** Using t-test on heavily skewed data with $n = 8$

**Solution:** Check histogram or Q-Q plot. Consider:
- Transformation (log, square root)
- Nonparametric alternative (Wilcoxon test)
- Bootstrapping

### Mistake 4: Reporting "No Significant Difference" as "Equal"

**Wrong:** "The t-test proved the two groups have equal means."

**Right:** "We found insufficient evidence that the group means differ."

### Best Practices

1. **Always check assumptions:**
   - Plot histograms or Q-Q plots for normality
   - Check variance homogeneity for two-sample tests
   - Verify independence of observations

2. **Report confidence intervals:**
   - They provide more information than p-values alone
   - Show both statistical significance and practical significance

3. **Use appropriate test:**
   - Paired vs. unpaired is critical
   - When unsure about equal variances, use Welch's test

4. **Consider effect size:**
   - Cohen's $d = \frac{\bar{x}_1 - \bar{x}_2}{s_p}$ for two-sample tests
   - Small: 0.2, Medium: 0.5, Large: 0.8

5. **Visualize your data:**
   - Box plots for comparing groups
   - Scatter plots for paired data

## Summary

- T-tests are used when population standard deviation is unknown
- T-distribution has heavier tails than normal; approaches normal as df increases
- **One-sample t-test:** Tests single population mean against hypothesized value
- **Two-sample t-test:** Compares means from two independent groups
  - Pooled version assumes equal variances
  - Welch's version allows unequal variances
- **Paired t-test:** Compares measurements on same subjects or matched pairs
- Choosing between paired and unpaired is critical
- Always check assumptions: normality, independence, equal variances (when assumed)
- Report confidence intervals alongside hypothesis test results
