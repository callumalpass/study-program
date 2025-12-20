---
id: math202-t4-ci-variance
title: "Confidence Intervals for Variance"
order: 6
---

# Confidence Intervals for Variance

While confidence intervals for means and proportions are more commonly discussed, intervals for variance and standard deviation are equally important in applications requiring precision control, quality assurance, and risk assessment. These intervals rely on the chi-squared distribution and have somewhat different properties than intervals for location parameters.

## Why Estimate Variance?

Variance measures **spread** or **variability**. In many applications, controlling or understanding variability is as important as understanding the mean:

- **Manufacturing:** Consistency is critical. A product might have the right mean weight, but too much variance means some items are over/underweight.
- **Finance:** Portfolio variance (risk) is a key metric alongside expected return.
- **Quality control:** Six Sigma initiatives focus heavily on reducing process variance.
- **Laboratory measurements:** Instrument precision is quantified by measurement variance.

**Example:** A pharmaceutical company produces pills with target weight 500 mg. Even if the mean weight is exactly 500 mg, high variance means some pills are dangerously under- or over-dosed.

## The Chi-Squared Distribution

Confidence intervals for variance are based on the **chi-squared distribution**.

**Definition:** If $X_1, \ldots, X_n$ are independent $N(\mu, \sigma^2)$ random variables, then:
$$\frac{(n-1)S^2}{\sigma^2} \sim \chi^2_{n-1}$$

where $S^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar{X})^2$ is the sample variance and $\chi^2_{n-1}$ denotes the chi-squared distribution with $n-1$ degrees of freedom.

**Properties of the Chi-Squared Distribution:**
- Only defined for non-negative values (since it's based on squared deviations)
- **Skewed right**, especially for small degrees of freedom
- Mean: $E[\chi^2_k] = k$ (degrees of freedom)
- Variance: $\text{Var}(\chi^2_k) = 2k$
- Becomes more symmetric as degrees of freedom increase
- **Not symmetric** like the normal or $t$-distributions

**Critical Values:** We need two critical values for a two-sided interval:
- $\chi^2_{\alpha/2, n-1}$: Upper critical value (cuts off $\alpha/2$ in right tail)
- $\chi^2_{1-\alpha/2, n-1}$: Lower critical value (cuts off $\alpha/2$ in left tail)

**Important:** Because the chi-squared distribution is skewed, these are **not** equidistant from the center.

## Confidence Interval for Population Variance

**Assumption:** The data come from a **normal distribution**. This assumption is more critical here than for means (where CLT helps with large samples).

**Formula:**
$$\left[\frac{(n-1)s^2}{\chi^2_{\alpha/2, n-1}}, \frac{(n-1)s^2}{\chi^2_{1-\alpha/2, n-1}}\right]$$

**Derivation:** Starting from:
$$\frac{(n-1)S^2}{\sigma^2} \sim \chi^2_{n-1}$$

For a $(1-\alpha) \times 100\%$ confidence level:
$$P\left(\chi^2_{1-\alpha/2, n-1} \leq \frac{(n-1)S^2}{\sigma^2} \leq \chi^2_{\alpha/2, n-1}\right) = 1 - \alpha$$

Taking reciprocals and multiplying by $(n-1)S^2$ (note inequality reversal):
$$P\left(\frac{(n-1)S^2}{\chi^2_{\alpha/2, n-1}} \leq \sigma^2 \leq \frac{(n-1)S^2}{\chi^2_{1-\alpha/2, n-1}}\right) = 1 - \alpha$$

### Example 1: Quality Control

A manufacturer of precision bolts measures 20 bolts and finds the sample variance in diameter is $s^2 = 0.0025$ mm². Construct a 95% confidence interval for the population variance.

**Given:** $n = 20$, $s^2 = 0.0025$, confidence level = 95%

**Degrees of freedom:** $df = n - 1 = 19$

**Critical values from chi-squared table:**
- $\chi^2_{0.025, 19} = 32.852$ (upper critical value)
- $\chi^2_{0.975, 19} = 8.907$ (lower critical value)

**Confidence interval:**
$$\left[\frac{(20-1)(0.0025)}{32.852}, \frac{(20-1)(0.0025)}{8.907}\right]$$

$$= \left[\frac{0.0475}{32.852}, \frac{0.0475}{8.907}\right]$$

$$= [0.00145, 0.00533]$$

**Interpretation:** We are 95% confident that the true population variance in bolt diameter is between 0.00145 mm² and 0.00533 mm².

**Note:** The interval is not symmetric around $s^2 = 0.0025$ due to the skewness of the chi-squared distribution.

## Confidence Interval for Population Standard Deviation

Often, we want an interval for the **standard deviation** $\sigma$ rather than variance $\sigma^2$.

**Formula:** Simply take the square root of the variance interval endpoints:
$$\left[\sqrt{\frac{(n-1)s^2}{\chi^2_{\alpha/2, n-1}}}, \sqrt{\frac{(n-1)s^2}{\chi^2_{1-\alpha/2, n-1}}}\right]$$

Or more simply:
$$\left[s\sqrt{\frac{n-1}{\chi^2_{\alpha/2, n-1}}}, s\sqrt{\frac{n-1}{\chi^2_{1-\alpha/2, n-1}}}\right]$$

### Example 2: Standard Deviation (Continuing Example 1)

From Example 1, we have $s = \sqrt{0.0025} = 0.05$ mm.

**Confidence interval for σ:**
$$[\sqrt{0.00145}, \sqrt{0.00533}] = [0.038, 0.073]$$

**Interpretation:** We are 95% confident that the true population standard deviation in bolt diameter is between 0.038 mm and 0.073 mm.

### Example 3: Laboratory Precision

A chemist measures the same solution 15 times to assess instrument precision. The measurements have a sample standard deviation of $s = 2.3$ units. Construct a 90% confidence interval for the true measurement standard deviation.

**Given:** $n = 15$, $s = 2.3$, confidence level = 90%

**Degrees of freedom:** $df = 14$

**Critical values:**
- $\chi^2_{0.05, 14} = 23.685$
- $\chi^2_{0.95, 14} = 6.571$

**Sample variance:** $s^2 = (2.3)^2 = 5.29$

**Confidence interval for σ:**
$$\left[\sqrt{\frac{14 \times 5.29}{23.685}}, \sqrt{\frac{14 \times 5.29}{6.571}}\right]$$

$$= \left[\sqrt{\frac{74.06}{23.685}}, \sqrt{\frac{74.06}{6.571}}\right]$$

$$= [\sqrt{3.126}, \sqrt{11.27}]$$

$$= [1.77, 3.36]$$

**Interpretation:** We are 90% confident that the true measurement standard deviation is between 1.77 and 3.36 units.

## Coefficient of Variation

Sometimes variability is expressed relative to the mean using the **coefficient of variation**:

$$CV = \frac{\sigma}{\mu}$$

A confidence interval for $CV$ can be constructed, though it's more complex and typically requires the delta method or bootstrap approaches. For a quick approximation:

$$\hat{CV} = \frac{s}{\bar{x}}$$

## Testing Variance Claims

Confidence intervals for variance can be used to test claims, similar to how we use intervals for means.

### Example 4: Testing a Specification

A company claims their product has a standard deviation of at most 5 units. A sample of 25 items yields $s = 6.2$ units. Construct a 95% confidence interval and assess the claim.

**Given:** $n = 25$, $s = 6.2$, confidence level = 95%

**Degrees of freedom:** $df = 24$

**Critical values:**
- $\chi^2_{0.025, 24} = 39.364$
- $\chi^2_{0.975, 24} = 12.401$

**Confidence interval for σ:**
$$\left[6.2\sqrt{\frac{24}{39.364}}, 6.2\sqrt{\frac{24}{12.401}}\right]$$

$$= \left[6.2\sqrt{0.6097}, 6.2\sqrt{1.9355}\right]$$

$$= [6.2 \times 0.781, 6.2 \times 1.391]$$

$$= [4.84, 8.62]$$

**Interpretation:** We are 95% confident that the true standard deviation is between 4.84 and 8.62 units.

**Assessment:** The interval includes values both below and above 5. The claimed maximum of 5 is plausible but not strongly supported. The upper bound of 8.62 suggests the true standard deviation could be substantially higher than claimed.

## Comparing Two Variances

To compare variances from two populations, we use the **F-distribution** and construct a confidence interval for the ratio of variances.

**Statistic:**
$$F = \frac{S_1^2}{S_2^2}$$

where $S_1^2$ and $S_2^2$ are sample variances from independent normal populations.

Under the null hypothesis that $\sigma_1^2 = \sigma_2^2$:
$$F \sim F_{n_1-1, n_2-1}$$

**Confidence Interval for Ratio $\sigma_1^2/\sigma_2^2$:**
$$\left[\frac{s_1^2}{s_2^2} \cdot \frac{1}{F_{\alpha/2, n_1-1, n_2-1}}, \frac{s_1^2}{s_2^2} \cdot F_{\alpha/2, n_2-1, n_1-1}\right]$$

**Note:** The F-distribution is also skewed, with different degrees of freedom for numerator and denominator.

### Example 5: Comparing Process Variability

Two manufacturing processes produce the same part. Process A has $n_1 = 16$ samples with $s_1^2 = 12.5$. Process B has $n_2 = 21$ samples with $s_2^2 = 8.3$. Construct a 95% confidence interval for the ratio of variances.

**Given:** $n_1 = 16$, $s_1^2 = 12.5$, $n_2 = 21$, $s_2^2 = 8.3$

**Degrees of freedom:** $df_1 = 15$, $df_2 = 20$

**Variance ratio:** $\frac{s_1^2}{s_2^2} = \frac{12.5}{8.3} = 1.506$

**Critical values (from F-table):**
- $F_{0.025, 15, 20} \approx 2.57$
- $F_{0.025, 20, 15} \approx 2.76$

**Confidence interval:**
$$\left[\frac{1.506}{2.57}, 1.506 \times 2.76\right] = [0.586, 4.157]$$

**Interpretation:** We are 95% confident that the ratio of variances (Process A to Process B) is between 0.586 and 4.157.

**Assessment:** Since the interval includes 1, we cannot conclude the variances are different. The processes may have similar variability.

## Assumptions and Robustness

### Critical Assumption: Normality

Confidence intervals for variance based on the chi-squared distribution **require** the population to be normally distributed. This is **much more important** than normality for intervals on means.

**Why?**
- For means, the CLT provides robustness for large samples
- For variances, there's no analogous central limit theorem
- The chi-squared distribution is derived specifically for normal populations

**Checking normality:**
- Normal probability plots (Q-Q plots)
- Shapiro-Wilk test or Anderson-Darling test
- Histograms and boxplots

**If normality is violated:**
- Results can be very misleading
- Consider transformations (e.g., log transform)
- Use bootstrap methods for robust intervals
- Use nonparametric approaches

### Sensitivity to Outliers

Sample variance is very sensitive to outliers (squared deviations amplify extreme values). A single outlier can dramatically affect the confidence interval.

**Practical advice:**
- Check for outliers before computing intervals
- Investigate whether outliers are data errors or genuine extreme values
- Consider robust variance estimators (e.g., median absolute deviation)

## Sample Size Considerations

Unlike intervals for means, the width of variance confidence intervals doesn't decrease as quickly with increasing sample size due to the squared relationship.

**General guideline:** For variance intervals, you typically need larger samples than for mean intervals to achieve similar relative precision.

**Example:** To cut the interval width in half for a mean, quadruple the sample size. For variance, you might need an even larger increase.

## Practical Applications

### Manufacturing and Quality Control

**Process Capability:** Six Sigma programs focus on $\sigma$ (process standard deviation) relative to specification limits. Confidence intervals for $\sigma$ help assess whether a process meets capability requirements.

**Control charts:** Estimating process variance is fundamental to constructing control limits.

### Finance and Risk Management

**Portfolio risk:** Variance (or standard deviation) of returns measures investment risk. Confidence intervals quantify uncertainty in risk estimates.

**Value at Risk (VaR):** Requires accurate estimation of return variance.

### Science and Engineering

**Measurement error:** Confidence intervals for measurement standard deviation help assess instrument precision.

**Reliability analysis:** Variability in component lifetimes affects system reliability.

## Summary

**Confidence Interval for Population Variance:**
$$\left[\frac{(n-1)s^2}{\chi^2_{\alpha/2, n-1}}, \frac{(n-1)s^2}{\chi^2_{1-\alpha/2, n-1}}\right]$$

**Confidence Interval for Population Standard Deviation:**
$$\left[\sqrt{\frac{(n-1)s^2}{\chi^2_{\alpha/2, n-1}}}, \sqrt{\frac{(n-1)s^2}{\chi^2_{1-\alpha/2, n-1}}}\right]$$

**Key Points:**
- Based on the chi-squared distribution with $n-1$ degrees of freedom
- **Not symmetric** around $s^2$ or $s$ due to skewness
- **Requires normality** assumption (more critical than for mean intervals)
- Sensitive to outliers
- Use F-distribution to compare two variances

**When to Use:**
- Quality control and process capability studies
- Assessing measurement precision
- Risk assessment in finance
- Any application where variability is as important as central tendency

**Cautions:**
- Check normality assumption carefully
- Investigate outliers
- Larger samples needed for good precision compared to mean intervals

Understanding variability is essential in many fields. Confidence intervals for variance provide the tools to quantify uncertainty about population spread, complementing our knowledge about population location.
