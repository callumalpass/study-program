# Z-Tests for Means

Z-tests are among the most fundamental hypothesis tests in statistics. They allow us to make inferences about population means when the population standard deviation is known or when sample sizes are large enough to invoke the Central Limit Theorem. Understanding z-tests provides the foundation for more complex inference procedures.

## When to Use Z-Tests

Z-tests are appropriate when:

1. **Population standard deviation ($\sigma$) is known** — This is the classic scenario, though rare in practice
2. **Large sample size ($n \geq 30$)** — Central Limit Theorem ensures sampling distribution is approximately normal even if population isn't
3. **Population is normally distributed** — For smaller samples, if we know the population is normal and $\sigma$ is known

**Z-tests are NOT appropriate when:**
- Population standard deviation is unknown AND sample size is small → Use t-test instead
- Data are severely skewed with small samples → Consider nonparametric tests
- Testing proportions or categorical data → Use appropriate categorical tests (though z-test for proportions exists)

## One-Sample Z-Test

The one-sample z-test tests whether a population mean equals a hypothesized value.

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

$$Z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}$$

where:
- $\bar{x}$ = sample mean
- $\mu_0$ = hypothesized population mean
- $\sigma$ = known population standard deviation
- $n$ = sample size

This statistic measures how many standard errors the sample mean is from the hypothesized population mean.

### Decision Rules

**Critical value approach:**

**Two-tailed ($\alpha = 0.05$):** Reject $H_0$ if $|Z| > 1.96$

**Right-tailed ($\alpha = 0.05$):** Reject $H_0$ if $Z > 1.645$

**Left-tailed ($\alpha = 0.05$):** Reject $H_0$ if $Z < -1.645$

**P-value approach:** Reject $H_0$ if p-value $< \alpha$

**Two-tailed:** $p = 2 \cdot P(Z > |z_{obs}|)$

**Right-tailed:** $p = P(Z > z_{obs})$

**Left-tailed:** $p = P(Z < z_{obs})$

### Worked Example: Quality Control

**Problem:** A bottling company claims their bottles contain 500 mL on average. Historical data shows $\sigma = 10$ mL. A quality inspector samples 36 bottles and finds $\bar{x} = 497$ mL. Test at $\alpha = 0.05$ whether the true mean differs from 500 mL.

**Step 1: Hypotheses**
- $H_0: \mu = 500$ (bottles contain advertised amount)
- $H_a: \mu \neq 500$ (bottles don't contain advertised amount)
- Two-tailed test because we're detecting any difference

**Step 2: Significance level**
$\alpha = 0.05$

**Step 3: Test statistic**
One-sample z-test (known $\sigma$, $n = 36$ is large)

**Step 4: Calculate**
$$Z = \frac{497 - 500}{10/\sqrt{36}} = \frac{-3}{10/6} = \frac{-3}{1.667} = -1.80$$

**Step 5: Decision**

**Critical value approach:** For two-tailed test at $\alpha = 0.05$, critical values are $\pm 1.96$.

Since $|{-1.80}| = 1.80 < 1.96$, we fail to reject $H_0$.

**P-value approach:**
$$p = 2 \cdot P(Z < -1.80) = 2 \cdot 0.0359 = 0.0718$$

Since $0.0718 > 0.05$, we fail to reject $H_0$.

**Step 6: Conclusion**
At the 5% significance level, there is insufficient evidence to conclude that the mean bottle volume differs from 500 mL. The observed difference of 3 mL could reasonably be due to sampling variability.

**Note:** The result is close to the boundary ($p = 0.072$ is near 0.05). We might describe this as "marginally non-significant" or note that at $\alpha = 0.10$, we would reject $H_0$.

### Worked Example: Process Improvement

**Problem:** A factory's widget production has historical mean weight of 50 grams ($\sigma = 4$ grams). After installing new equipment, they sample 64 widgets and find $\bar{x} = 51.2$ grams. Has the mean weight increased? Test at $\alpha = 0.01$.

**Step 1: Hypotheses**
- $H_0: \mu = 50$
- $H_a: \mu > 50$
- Right-tailed test (only interested in whether weight increased)

**Step 2: Significance level**
$\alpha = 0.01$

**Step 3: Calculate**
$$Z = \frac{51.2 - 50}{4/\sqrt{64}} = \frac{1.2}{0.5} = 2.40$$

**Step 4: Decision**

**Critical value:** For right-tailed test at $\alpha = 0.01$, critical value is $z_{0.01} = 2.33$.

Since $2.40 > 2.33$, we reject $H_0$.

**P-value:** $p = P(Z > 2.40) = 0.0082$

Since $0.0082 < 0.01$, we reject $H_0$.

**Step 5: Conclusion**
At the 1% significance level, there is strong evidence that the new equipment produces widgets with mean weight greater than 50 grams. The increase of 1.2 grams is statistically significant.

## Two-Sample Z-Test (Independent Samples)

The two-sample z-test compares means from two independent populations.

### Hypotheses

**Two-tailed:**
- $H_0: \mu_1 = \mu_2$ (or equivalently, $\mu_1 - \mu_2 = 0$)
- $H_a: \mu_1 \neq \mu_2$

**Right-tailed:**
- $H_0: \mu_1 = \mu_2$
- $H_a: \mu_1 > \mu_2$

**Left-tailed:**
- $H_0: \mu_1 = \mu_2$
- $H_a: \mu_1 < \mu_2$

### Test Statistic

$$Z = \frac{(\bar{x}_1 - \bar{x}_2) - (\mu_1 - \mu_2)_0}{\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}}$$

Under $H_0: \mu_1 = \mu_2$, this simplifies to:

$$Z = \frac{\bar{x}_1 - \bar{x}_2}{\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}}$$

**Special case — Equal variances ($\sigma_1 = \sigma_2 = \sigma$):**

$$Z = \frac{\bar{x}_1 - \bar{x}_2}{\sigma\sqrt{\frac{1}{n_1} + \frac{1}{n_2}}}$$

### Assumptions

1. **Independent samples** — The two groups are not related
2. **Known population standard deviations** — $\sigma_1$ and $\sigma_2$ are known
3. **Normal populations OR large samples** — Either populations are normal or $n_1, n_2 \geq 30$

### Worked Example: Comparing Teaching Methods

**Problem:** Two teaching methods are compared. Method A has $\sigma_A = 12$ (historically known). Method B has $\sigma_B = 15$. A study assigns 40 students to Method A ($\bar{x}_A = 78$) and 35 students to Method B ($\bar{x}_B = 72$). Is there a significant difference? Test at $\alpha = 0.05$.

**Step 1: Hypotheses**
- $H_0: \mu_A = \mu_B$
- $H_a: \mu_A \neq \mu_B$
- Two-tailed test

**Step 2: Calculate**
$$Z = \frac{78 - 72}{\sqrt{\frac{12^2}{40} + \frac{15^2}{35}}} = \frac{6}{\sqrt{3.6 + 6.43}} = \frac{6}{\sqrt{10.03}} = \frac{6}{3.17} = 1.89$$

**Step 3: Decision**

Critical values at $\alpha = 0.05$: $\pm 1.96$

Since $|1.89| = 1.89 < 1.96$, we fail to reject $H_0$.

**P-value:** $p = 2 \cdot P(Z > 1.89) = 2 \cdot 0.0294 = 0.0588$

**Step 4: Conclusion**
At the 5% significance level, there is insufficient evidence to conclude that the two teaching methods produce different mean scores. The observed difference of 6 points could reasonably be due to chance.

**Practical note:** The result is borderline ($p = 0.059$ is just above 0.05). We might consider:
- The practical significance of a 6-point difference
- Collecting more data to increase power
- Reporting a confidence interval for the difference

### Worked Example: Drug vs. Placebo

**Problem:** A pharmaceutical trial compares a new drug to placebo for reducing systolic blood pressure. Historical data: $\sigma_{drug} = 18$ mmHg, $\sigma_{placebo} = 20$ mmHg.

Results:
- Drug group: $n_1 = 50$, $\bar{x}_1 = 128$ mmHg
- Placebo group: $n_2 = 50$, $\bar{x}_2 = 138$ mmHg

Does the drug reduce blood pressure more than placebo? Test at $\alpha = 0.01$.

**Step 1: Hypotheses**
- $H_0: \mu_{drug} = \mu_{placebo}$
- $H_a: \mu_{drug} < \mu_{placebo}$
- Left-tailed test (drug should lower pressure)

**Step 2: Calculate**
$$Z = \frac{128 - 138}{\sqrt{\frac{18^2}{50} + \frac{20^2}{50}}} = \frac{-10}{\sqrt{6.48 + 8}} = \frac{-10}{\sqrt{14.48}} = \frac{-10}{3.81} = -2.62$$

**Step 3: Decision**

Critical value for left-tailed test at $\alpha = 0.01$: $z_{0.01} = -2.33$

Since $-2.62 < -2.33$, we reject $H_0$.

**P-value:** $p = P(Z < -2.62) = 0.0044$

**Step 4: Conclusion**
At the 1% significance level, there is strong evidence that the drug reduces mean systolic blood pressure more than placebo. The reduction of 10 mmHg is both statistically significant and clinically meaningful.

## Confidence Intervals and Hypothesis Tests

There's a direct connection between confidence intervals and two-tailed hypothesis tests.

### One-Sample Case

A $(1-\alpha) \times 100\%$ confidence interval for $\mu$ is:
$$\bar{x} \pm z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}$$

**Connection to hypothesis testing:**
- If $\mu_0$ falls inside the confidence interval → Fail to reject $H_0: \mu = \mu_0$ at level $\alpha$
- If $\mu_0$ falls outside the confidence interval → Reject $H_0: \mu = \mu_0$ at level $\alpha$

**Example:** Bottling company data ($\bar{x} = 497$, $\sigma = 10$, $n = 36$)

95% CI:
$$497 \pm 1.96 \cdot \frac{10}{\sqrt{36}} = 497 \pm 3.27 = (493.73, 500.27)$$

Since $\mu_0 = 500$ is inside this interval, we fail to reject $H_0: \mu = 500$ at $\alpha = 0.05$ (consistent with our earlier test).

### Two-Sample Case

A $(1-\alpha) \times 100\%$ confidence interval for $\mu_1 - \mu_2$ is:
$$(\bar{x}_1 - \bar{x}_2) \pm z_{\alpha/2} \cdot \sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}$$

**Connection:**
- If 0 is inside the interval → Fail to reject $H_0: \mu_1 = \mu_2$
- If 0 is outside the interval → Reject $H_0: \mu_1 = \mu_2$

**Example:** Teaching methods ($\bar{x}_A - \bar{x}_B = 6$, SE = 3.17)

95% CI:
$$6 \pm 1.96 \cdot 3.17 = 6 \pm 6.21 = (-0.21, 12.21)$$

Since 0 is inside this interval, we fail to reject $H_0: \mu_A = \mu_B$ (consistent with test).

## Common Pitfalls and Best Practices

### Pitfall 1: Using Z-Test When σ is Unknown

**Wrong:** Estimating $\sigma$ with sample standard deviation $s$ in small samples.

**Right:** Use t-test when $\sigma$ is unknown, especially for $n < 30$.

### Pitfall 2: Ignoring Sample Size Requirements

**Problem:** Using z-test with $n = 15$ from a skewed population.

**Solution:** Check distributional assumptions or use nonparametric methods.

### Pitfall 3: Misinterpreting "Fail to Reject"

**Wrong:** "We proved the population mean is 500 mL."

**Right:** "We lack sufficient evidence to conclude the mean differs from 500 mL."

### Best Practices

1. **Check assumptions** before conducting the test
   - Is $\sigma$ truly known?
   - Is sample size large enough?
   - Are samples independent (for two-sample test)?

2. **Report effect sizes** alongside p-values
   - How large is the difference in practical terms?
   - What's the confidence interval?

3. **Consider practical significance**
   - A 0.1 mL difference in bottles might be statistically significant but practically meaningless
   - A 10 mmHg blood pressure reduction is both statistically and clinically significant

4. **Use appropriate visualizations**
   - Histograms to check normality
   - Box plots to compare groups
   - Confidence interval plots to show precision

## Summary

- Z-tests compare sample means to hypothesized values or to each other
- Appropriate when $\sigma$ is known or $n$ is large ($n \geq 30$)
- One-sample z-test: $Z = \frac{\bar{x} - \mu_0}{\sigma/\sqrt{n}}$
- Two-sample z-test: $Z = \frac{\bar{x}_1 - \bar{x}_2}{\sqrt{\sigma_1^2/n_1 + \sigma_2^2/n_2}}$
- Decision based on critical values or p-values
- Confidence intervals provide same information as two-tailed tests plus effect size
- Always verify assumptions and consider practical significance
- When $\sigma$ is unknown and $n$ is small, use t-tests instead
