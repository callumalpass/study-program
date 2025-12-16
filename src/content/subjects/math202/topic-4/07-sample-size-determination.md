# Sample Size Determination

One of the most common questions in study design is "How large should my sample be?" Sample size determination balances statistical precision against practical constraints like time, cost, and resources. Too small a sample gives unreliable results; too large wastes resources. This topic provides the tools to make this decision rigorously.

## The Fundamental Trade-Off

**Precision vs. Resources**

- **Larger samples** → narrower confidence intervals → more precise estimates → higher cost
- **Smaller samples** → wider confidence intervals → less precise estimates → lower cost

**Goal:** Find the minimum sample size that achieves desired precision at a specified confidence level.

## The Margin of Error

The **margin of error** (MOE or $E$) is half the width of a confidence interval. It represents the maximum likely difference between the estimate and the true parameter.

**For a mean (σ known):**
$$E = z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}$$

**For a proportion:**
$$E = z_{\alpha/2} \cdot \sqrt{\frac{p(1-p)}{n}}$$

**Key insight:** The margin of error decreases as $\sqrt{n}$ increases. To halve the margin of error, you need to quadruple the sample size.

## Sample Size for Estimating a Mean

### When σ is Known

**Problem:** We want to estimate the population mean $\mu$ with margin of error $E$ at confidence level $1-\alpha$.

**Formula:** Starting from:
$$E = z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}$$

Solve for $n$:
$$\sqrt{n} = \frac{z_{\alpha/2} \cdot \sigma}{E}$$

$$n = \left(\frac{z_{\alpha/2} \cdot \sigma}{E}\right)^2$$

**Rounding:** Always round **up** to ensure you meet the precision requirement.

### Example 1: Quality Control

A factory wants to estimate the mean weight of cereal boxes to within 2 grams with 95% confidence. Historical data shows $\sigma = 8$ grams. What sample size is needed?

**Given:** $E = 2$, $\sigma = 8$, confidence level = 95% ($z_{0.025} = 1.96$)

**Calculation:**
$$n = \left(\frac{1.96 \times 8}{2}\right)^2 = \left(\frac{15.68}{2}\right)^2 = (7.84)^2 = 61.47$$

**Round up:** $n = 62$

**Answer:** A sample of 62 boxes is needed.

**Interpretation:** With 62 boxes, we can be 95% confident our estimate will be within 2 grams of the true mean.

### When σ is Unknown

In practice, $\sigma$ is usually unknown. Options:

1. **Use a pilot study:** Conduct a small preliminary study to estimate $s$, then use it in place of $\sigma$
2. **Use previous studies:** If similar studies exist, use their reported standard deviation
3. **Use a conservative guess:** Make an educated guess, erring on the high side (larger $\sigma$ → larger $n$ → safer)
4. **Use the range rule:** Rough approximation $\sigma \approx \frac{\text{Range}}{4}$

**Modified formula (using $t$-distribution):**

When using the $t$-distribution, there's a circular problem: we need $n$ to determine degrees of freedom, but degrees of freedom depend on $n$.

**Iterative approach:**
1. Start with $z_{\alpha/2}$ and compute initial $n$
2. Use $n-1$ degrees of freedom to find $t_{\alpha/2, n-1}$
3. Recompute $n$ with this $t$ value
4. Repeat until $n$ stabilizes

For large $n$ (≥30), $t \approx z$, so the initial estimate is usually sufficient.

### Example 2: Unknown σ from Pilot Study

A researcher wants to estimate mean study time per week to within 1 hour with 90% confidence. A pilot study of 10 students gave $s = 4.5$ hours. What sample size is needed?

**Step 1:** Use $z$-approximation
$$n = \left(\frac{1.645 \times 4.5}{1}\right)^2 = (7.40)^2 = 54.8 \rightarrow 55$$

**Step 2:** Refine with $t$ (df = 54)
$t_{0.05, 54} \approx 1.674$

$$n = \left(\frac{1.674 \times 4.5}{1}\right)^2 = (7.53)^2 = 56.7 \rightarrow 57$$

**Step 3:** Check with df = 56
$t_{0.05, 56} \approx 1.673$ (very close to 1.674)

**Answer:** $n = 57$ students.

## Sample Size for Estimating a Proportion

**Problem:** We want to estimate a population proportion $p$ with margin of error $E$ at confidence level $1-\alpha$.

**Formula:** Starting from:
$$E = z_{\alpha/2} \cdot \sqrt{\frac{p(1-p)}{n}}$$

Solve for $n$:
$$E^2 = z_{\alpha/2}^2 \cdot \frac{p(1-p)}{n}$$

$$n = \frac{z_{\alpha/2}^2 \cdot p(1-p)}{E^2}$$

**Problem:** This formula requires knowing $p$, which is what we're trying to estimate!

**Solutions:**

### 1. Use a Prior Estimate

If you have a reasonable guess for $p$ (from previous studies, pilot data, or theory):
$$n = \frac{z_{\alpha/2}^2 \cdot \hat{p}(1-\hat{p})}{E^2}$$

### 2. Conservative Approach (No Prior Information)

The product $p(1-p)$ is maximized when $p = 0.5$, giving $p(1-p) = 0.25$.

**Conservative formula:**
$$n = \frac{z_{\alpha/2}^2 \cdot 0.25}{E^2} = \frac{z_{\alpha/2}^2}{4E^2}$$

This gives the **largest possible sample size** needed, guaranteeing the margin of error won't exceed $E$ regardless of the true $p$.

**Trade-off:** This approach is safe but may oversample if the true $p$ is far from 0.5.

### Example 3: Political Poll

A polling organization wants to estimate the proportion of voters supporting a candidate to within 3 percentage points with 95% confidence, with no prior information.

**Given:** $E = 0.03$, confidence level = 95% ($z_{0.025} = 1.96$), no prior estimate

**Conservative approach:**
$$n = \frac{(1.96)^2}{4(0.03)^2} = \frac{3.8416}{4(0.0009)} = \frac{3.8416}{0.0036} = 1067.1$$

**Round up:** $n = 1068$

**Answer:** Survey 1068 voters.

**Interpretation:** This sample size guarantees the margin of error won't exceed 3% regardless of the true support level.

### Example 4: With Prior Estimate

Suppose in Example 3 we had prior information suggesting support is around 40%. What sample size is needed?

**Given:** $E = 0.03$, confidence level = 95%, $\hat{p} = 0.40$

**Calculation:**
$$n = \frac{(1.96)^2 \cdot 0.40(0.60)}{(0.03)^2} = \frac{3.8416 \cdot 0.24}{0.0009} = \frac{0.9220}{0.0009} = 1024.4$$

**Round up:** $n = 1025$

**Comparison:** Using the prior estimate requires 1025 vs. 1068 for the conservative approach—a savings of 43 respondents (about 4%).

**Note:** When $p$ is near 0.5, the prior estimate doesn't save much. When $p$ is extreme (near 0 or 1), the savings are more substantial.

### Example 5: Extreme Proportion

A quality inspector wants to estimate the defect rate to within 1% with 99% confidence. Historical data suggests the defect rate is around 2%.

**Given:** $E = 0.01$, confidence level = 99% ($z_{0.005} = 2.576$), $\hat{p} = 0.02$

**Calculation:**
$$n = \frac{(2.576)^2 \cdot 0.02(0.98)}{(0.01)^2} = \frac{6.635 \cdot 0.0196}{0.0001} = \frac{0.1300}{0.0001} = 1300.5$$

**Round up:** $n = 1301$

**Conservative approach would give:**
$$n = \frac{(2.576)^2}{4(0.01)^2} = \frac{6.635}{0.0004} = 16588.4 \rightarrow 16589$$

**Savings:** Using the prior estimate saves over 15,000 samples! When $p$ is far from 0.5, prior information is very valuable.

## Relationship Between Confidence Level, Margin of Error, and Sample Size

**Key relationships:**

1. **Higher confidence → larger $n$**
   - 90% confidence: $z = 1.645$
   - 95% confidence: $z = 1.96$ (about 42% more samples than 90%)
   - 99% confidence: $z = 2.576$ (about 73% more samples than 95%)

2. **Smaller margin of error → larger $n$**
   - $n \propto \frac{1}{E^2}$
   - Halving $E$ requires quadrupling $n$
   - One-tenth $E$ requires 100 times $n$

3. **Higher variability → larger $n$**
   - For means: larger $\sigma$ → larger $n$
   - For proportions: $p$ near 0.5 → larger $n$

### Example 6: Comparing Requirements

Calculate the sample size needed to estimate a mean with $\sigma = 10$ under different scenarios:

| Confidence | Margin of Error | $z$ | Sample Size |
|------------|----------------|-----|-------------|
| 95% | 2 | 1.96 | $\left(\frac{1.96 \times 10}{2}\right)^2 = 96.04 \rightarrow 97$ |
| 99% | 2 | 2.576 | $\left(\frac{2.576 \times 10}{2}\right)^2 = 166.4 \rightarrow 167$ |
| 95% | 1 | 1.96 | $\left(\frac{1.96 \times 10}{1}\right)^2 = 384.2 \rightarrow 385$ |
| 90% | 2 | 1.645 | $\left(\frac{1.645 \times 10}{2}\right)^2 = 67.7 \rightarrow 68$ |

**Observations:**
- Going from 95% to 99% confidence (same $E = 2$): $n$ increases from 97 to 167 (72% increase)
- Halving $E$ from 2 to 1 (same 95% confidence): $n$ increases from 97 to 385 (quadruples)
- Dropping to 90% confidence: $n$ decreases to 68 (30% reduction)

## Practical Considerations

### 1. Feasibility Constraints

The calculated sample size might be:
- **Too large:** Beyond budget or time constraints
- **Too small:** Easy to exceed

**If $n$ is too large:**
- Increase margin of error (less precision)
- Reduce confidence level (less certainty)
- Reduce scope (smaller population, subgroup analysis)
- Seek additional funding or time

**If $n$ is too small:**
- Sample more than needed for safety margin
- Use sample for other analyses too
- Consider stratified or cluster sampling for efficiency

### 2. Response Rates

For surveys, account for non-response:
$$n_{\text{needed}} = \frac{n_{\text{calculated}}}{\text{expected response rate}}$$

**Example:** If you need 400 responses and expect 60% response rate:
$$n_{\text{needed}} = \frac{400}{0.60} = 667$$

Send surveys to 667 people.

### 3. Finite Population Correction

When sampling a substantial fraction of a finite population of size $N$, use the **finite population correction**:

$$n_{\text{adjusted}} = \frac{n_0}{1 + \frac{n_0 - 1}{N}}$$

where $n_0$ is the sample size calculated for an infinite population.

**Example:** A school has 500 students. The formula gives $n_0 = 384$ for a certain precision. Adjust:

$$n_{\text{adjusted}} = \frac{384}{1 + \frac{383}{500}} = \frac{384}{1.766} = 217.4 \rightarrow 218$$

The finite population correction reduces the required sample from 384 to 218.

### 4. Pilot Studies

**Two-stage approach:**
1. **Pilot study:** Small preliminary study (e.g., $n = 30$) to estimate $\sigma$ or $p$
2. **Main study:** Use pilot estimates to determine final sample size

**Benefit:** More accurate $n$ determination when no prior data exists.

**Cost:** Requires two rounds of data collection.

## Summary Tables

### For Estimating a Mean (σ known or estimated)

$$n = \left(\frac{z_{\alpha/2} \cdot \sigma}{E}\right)^2$$

| Confidence Level | $z_{\alpha/2}$ |
|------------------|----------------|
| 90% | 1.645 |
| 95% | 1.96 |
| 99% | 2.576 |

### For Estimating a Proportion

**With prior estimate $\hat{p}$:**
$$n = \frac{z_{\alpha/2}^2 \cdot \hat{p}(1-\hat{p})}{E^2}$$

**Without prior estimate (conservative):**
$$n = \frac{z_{\alpha/2}^2}{4E^2}$$

## Summary

**Sample Size Determination:**
- Balances precision (margin of error) against cost
- Requires specifying: confidence level, margin of error, and variability estimate
- Always round up to ensure requirements are met

**Key Formulas:**

**Mean (σ known):**
$$n = \left(\frac{z_{\alpha/2} \cdot \sigma}{E}\right)^2$$

**Proportion (conservative):**
$$n = \frac{z_{\alpha/2}^2}{4E^2}$$

**Proportion (with estimate):**
$$n = \frac{z_{\alpha/2}^2 \cdot \hat{p}(1-\hat{p})}{E^2}$$

**Key Relationships:**
- $n$ increases with confidence level (higher certainty)
- $n$ increases as $E$ decreases (more precision)
- $n$ increases with variability ($\sigma$ or $p$ near 0.5)
- $n \propto \frac{1}{E^2}$ (halving $E$ requires 4× sample)

**Practical Steps:**
1. Specify desired confidence level and margin of error
2. Estimate variability (from pilot study, prior research, or conservative guess)
3. Calculate $n$ using appropriate formula
4. Round up
5. Adjust for non-response or finite population if needed
6. Assess feasibility and adjust parameters if necessary

Sample size determination is both an art and a science. While formulas provide mathematical guidance, practical judgment about costs, feasibility, and acceptable precision is essential for good study design.
