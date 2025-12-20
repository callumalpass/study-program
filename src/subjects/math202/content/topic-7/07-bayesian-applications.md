## Bayesian Applications

Bayesian inference isn't just a theoretical framework—it powers real-world decision-making across industries and scientific disciplines. This subtopic explores three important applications: A/B testing for product optimization, spam filtering for email classification, and medical diagnosis for clinical decision support. These examples illustrate how Bayesian thinking translates abstract probability into actionable insights.

---

## A/B Testing

A/B testing compares two variants (A and B) to determine which performs better. While traditionally analyzed with frequentist methods, the Bayesian approach offers more intuitive interpretations and flexible decision-making.

### The Traditional Frequentist Approach

**Problem:** Test if new website design (B) has higher conversion rate than current design (A).

**Frequentist method:**
1. Choose sample size in advance (e.g., n = 1000 per variant)
2. Collect all data
3. Compute p-value for test of $H_0: \theta_A = \theta_B$
4. If p < 0.05, declare B significantly better

**Limitations:**
- Must choose sample size before starting
- Can't peek at data (invalidates p-value)
- Binary decision (significant or not)
- P-value is frequently misinterpreted
- "Not significant" doesn't mean "no difference"

### The Bayesian Approach

**Setup:**
- Prior: $\theta_A \sim \text{Beta}(\alpha_A, \beta_A)$, $\theta_B \sim \text{Beta}(\alpha_B, \beta_B)$
- Data: $n_A$ visitors to A with $x_A$ conversions, $n_B$ visitors to B with $x_B$ conversions
- Posterior: $\theta_A \mid x_A \sim \text{Beta}(\alpha_A + x_A, \beta_A + n_A - x_A)$
- Posterior: $\theta_B \mid x_B \sim \text{Beta}(\alpha_B + x_B, \beta_B + n_B - x_B)$

**Key questions answered:**
1. What's the probability B is better than A?
2. What's the expected lift (improvement)?
3. What's the probability lift exceeds some threshold (e.g., 10%)?

### Example: Landing Page Test

**Scenario:** Testing new landing page design.

**Priors:** Weakly informative Beta(5, 45) for both (prior belief: ~10% conversion, but uncertain)

**Data after 1 week:**
- Design A: 500 visitors, 58 conversions (11.6%)
- Design B: 500 visitors, 71 conversions (14.2%)

**Posteriors:**
- $\theta_A \mid x_A \sim \text{Beta}(63, 487)$: mean = 11.5%, 95% CI = [9.0%, 14.3%]
- $\theta_B \mid x_B \sim \text{Beta}(76, 474)$: mean = 13.8%, 95% CI = [11.2%, 16.7%]

**Is B better than A?**

Simulate 100,000 draws from each posterior:
```
theta_A_samples = beta(63, 487, size=100000)
theta_B_samples = beta(76, 474, size=100000)
prob_B_better = mean(theta_B_samples > theta_A_samples)
```

Result: $P(\theta_B > \theta_A \mid x) = 0.93$

**Expected lift:**
```
lift = theta_B_samples - theta_A_samples
mean_lift = mean(lift)
```

Result: Expected lift = 2.3 percentage points (11.5% → 13.8%)

**Probability of substantial improvement:**
$P(\theta_B > 1.1 \cdot \theta_A \mid x) = 0.78$

There's a 78% chance B is at least 10% better than A.

### Decision Making

**Three possible decisions:**

1. **Implement B:** If $P(\theta_B > \theta_A) > 0.95$ or expected lift is large
2. **Keep A:** If $P(\theta_A > \theta_B) > 0.95$
3. **Keep testing:** If evidence is inconclusive

In this example, P(B better) = 0.93 is suggestive but perhaps not conclusive. Depending on the cost of implementing B and the value of improvements, you might:
- **Continue testing** to gather more evidence
- **Implement B** if the cost is low and potential gain is high
- **Run a larger test** if the decision is high-stakes

### Sequential Testing

A major advantage of Bayesian A/B testing: you can check results anytime without invalidating inference.

**Week 1:** 500/500 visitors, P(B better) = 0.93 → Continue

**Week 2:** 1000/1000 visitors, P(B better) = 0.97 → Strong evidence, might implement

**Week 3:** 1500/1500 visitors, P(B better) = 0.98 → Very strong evidence, implement B

This sequential approach is **invalid** in frequentist testing (peeking inflates Type I error) but **perfectly valid** in Bayesian framework.

### Expected Loss

For decision-making under uncertainty, compute expected loss of each action.

**Loss function:** Revenue lost per visitor by choosing wrong variant.

If we choose A but B is better: lose $(\theta_B - \theta_A) \times \text{value per conversion}$ per visitor

**Expected loss of choosing A:**
$$E[\text{loss} \mid \text{choose A}] = E[\max(0, \theta_B - \theta_A) \mid x] \times \text{value}$$

**Expected loss of choosing B:**
$$E[\text{loss} \mid \text{choose B}] = E[\max(0, \theta_A - \theta_B) \mid x] \times \text{value}$$

Choose the action with lower expected loss.

**Example:** Each conversion worth $50.

Expected loss of A: $E[\max(0, \theta_B - \theta_A)] = 0.019$, so $0.019 \times $50 = $0.95 per visitor

Expected loss of B: $E[\max(0, \theta_A - \theta_B)] = 0.002$, so $0.002 \times $50 = $0.10 per visitor

Choose B (lower expected loss).

---

## Spam Filtering

Email spam filtering is a classic application of Bayesian classification. The Naive Bayes classifier uses Bayes' theorem to classify emails as spam or legitimate.

### The Classification Problem

**Input:** Email message (text, subject, headers)

**Output:** Spam or Ham (legitimate email)

**Approach:** Compute $P(\text{Spam} \mid \text{email})$ and $P(\text{Ham} \mid \text{email})$, classify as whichever is higher.

### Naive Bayes Classifier

**Bayes' theorem:**
$$P(\text{Spam} \mid \text{email}) = \frac{P(\text{email} \mid \text{Spam}) \cdot P(\text{Spam})}{P(\text{email})}$$

**Key simplification (naive assumption):** Words appear independently:
$$P(\text{email} \mid \text{Spam}) = \prod_{i=1}^n P(w_i \mid \text{Spam})$$

where $w_1, \ldots, w_n$ are the words in the email.

This assumption is "naive" because words aren't truly independent (e.g., "free" and "money" often appear together in spam). But it works remarkably well in practice!

### Training the Classifier

**Data:** Labeled emails (spam or ham)

**Estimate:**
1. **Prior probabilities:**
   - $P(\text{Spam}) = \frac{\text{# spam emails}}{\text{total emails}}$
   - $P(\text{Ham}) = 1 - P(\text{Spam})$

2. **Word probabilities:**
   - $P(w_i \mid \text{Spam}) = \frac{\text{# spam emails containing } w_i}{\text{# spam emails}}$
   - $P(w_i \mid \text{Ham}) = \frac{\text{# ham emails containing } w_i}{\text{# ham emails}}$

### Example: Classifying an Email

**Training data:**
- 1000 emails: 400 spam, 600 ham
- "free" appears in 200 spam emails, 20 ham emails
- "meeting" appears in 10 spam emails, 300 ham emails

**Priors:**
- $P(\text{Spam}) = 0.4$
- $P(\text{Ham}) = 0.6$

**Word probabilities:**
- $P(\text{free} \mid \text{Spam}) = 200/400 = 0.5$
- $P(\text{free} \mid \text{Ham}) = 20/600 = 0.033$
- $P(\text{meeting} \mid \text{Spam}) = 10/400 = 0.025$
- $P(\text{meeting} \mid \text{Ham}) = 300/600 = 0.5$

**New email:** "Free meeting"

**Compute likelihoods (ignoring normalization):**

Spam: $P(\text{email} \mid \text{Spam}) \cdot P(\text{Spam})$
$$= P(\text{free} \mid \text{Spam}) \cdot P(\text{meeting} \mid \text{Spam}) \cdot P(\text{Spam})$$
$$= 0.5 \times 0.025 \times 0.4 = 0.005$$

Ham: $P(\text{email} \mid \text{Ham}) \cdot P(\text{Ham})$
$$= P(\text{free} \mid \text{Ham}) \cdot P(\text{meeting} \mid \text{Ham}) \cdot P(\text{Ham})$$
$$= 0.033 \times 0.5 \times 0.6 = 0.01$$

**Normalized probabilities:**
$$P(\text{Spam} \mid \text{email}) = \frac{0.005}{0.005 + 0.01} = 0.33$$
$$P(\text{Ham} \mid \text{email}) = \frac{0.01}{0.005 + 0.01} = 0.67$$

**Classification:** Ham (67% probability)

The word "free" suggests spam, but "meeting" strongly suggests ham, and ham is more common overall (60% base rate).

### Smoothing

**Problem:** What if a word never appeared in training data?

Then $P(w \mid \text{Spam}) = 0$, which would make the entire product zero!

**Solution:** Laplace smoothing (add pseudocounts):
$$P(w_i \mid \text{Spam}) = \frac{\text{count}(w_i, \text{Spam}) + \alpha}{\text{total spam words} + \alpha \times |V|}$$

where $|V|$ is vocabulary size and $\alpha$ is smoothing parameter (often $\alpha = 1$).

This ensures no probability is exactly zero.

### Practical Enhancements

**Modern spam filters use:**

1. **Better features:**
   - Word pairs/trigrams (capture context)
   - Headers (sender, reply-to, routing)
   - HTML features (hidden text, link patterns)
   - Attachments (suspicious file types)

2. **Continuous learning:**
   - Update probabilities as users mark spam/ham
   - Adapt to evolving spam tactics

3. **Hybrid approaches:**
   - Combine Naive Bayes with other methods
   - Use Bayesian probabilities as features in ensemble models

4. **Personalization:**
   - Learn user-specific preferences
   - "Viagra" might be spam for most users but ham for doctors

### Why Bayesian?

Bayesian spam filtering has several advantages:

- **Probabilistic output:** Get confidence (probability) rather than hard classification
- **Interpretable:** Can see which words contribute most to spam score
- **Fast:** Efficient to train and classify
- **Adaptive:** Easy to update with new data
- **Handles uncertainty:** Natural framework for uncertain classification

---

## Medical Diagnosis

Medical diagnosis involves reasoning under uncertainty: given symptoms and test results, what's the probability a patient has a disease? Bayesian inference provides a principled framework for this reasoning.

### Diagnostic Testing

**Setup:**
- Disease prevalence: $P(D)$ (base rate in population)
- Test sensitivity: $P(\text{positive} \mid D)$ (probability test is positive given disease)
- Test specificity: $P(\text{negative} \mid \neg D)$ (probability test is negative given no disease)

**Question:** Patient tests positive. What's $P(D \mid \text{positive})$?

**Bayes' theorem:**
$$P(D \mid \text{positive}) = \frac{P(\text{positive} \mid D) \cdot P(D)}{P(\text{positive})}$$

where:
$$P(\text{positive}) = P(\text{positive} \mid D) P(D) + P(\text{positive} \mid \neg D) P(\neg D)$$

### Example: HIV Testing

**Parameters:**
- Prevalence: $P(D) = 0.001$ (1 in 1000 people have HIV)
- Sensitivity: $P(\text{+} \mid D) = 0.95$ (test detects 95% of cases)
- Specificity: $P(\text{-} \mid \neg D) = 0.98$ (test correctly identifies 98% of negatives)

**Patient tests positive. What's the probability they have HIV?**

**Compute:**
$$P(\text{+}) = 0.95 \times 0.001 + 0.02 \times 0.999 = 0.00095 + 0.01998 = 0.02093$$

$$P(D \mid \text{+}) = \frac{0.95 \times 0.001}{0.02093} = \frac{0.00095}{0.02093} = 0.045$$

**Result:** Only 4.5% chance the patient has HIV!

**Why so low?** The base rate is very low (0.1%). Even with a good test, most positive results are false positives when the disease is rare.

### Sequential Testing

Bayesian framework naturally handles multiple tests.

**After first positive test:** $P(D \mid +) = 0.045$ (posterior becomes new prior)

**Second test (independent):** Use updated prior:
$$P(D \mid +, +) = \frac{P(+ \mid D) \cdot P(D \mid +)}{P(+ \mid +)}$$

$$= \frac{0.95 \times 0.045}{0.95 \times 0.045 + 0.02 \times 0.955} = \frac{0.0428}{0.0428 + 0.0191} = 0.69$$

After two positive tests, probability increases to 69%.

**Third positive test:**
$$P(D \mid +, +, +) = \frac{0.95 \times 0.69}{0.95 \times 0.69 + 0.02 \times 0.31} = 0.99$$

After three positive tests, we're 99% confident the patient has the disease.

### Incorporating Symptoms

Real diagnosis combines test results with symptoms and risk factors.

**Example:** Chest pain diagnosis.

**Competing hypotheses:**
- $H_1$: Heart attack
- $H_2$: Angina
- $H_3$: Acid reflux
- $H_4$: Muscle strain

**Priors (based on patient age, risk factors):**
- $P(H_1) = 0.15$
- $P(H_2) = 0.25$
- $P(H_3) = 0.40$
- $P(H_4) = 0.20$

**Symptoms observed:** Sharp pain, worse with breathing, no radiation to arm.

**Likelihoods:**
- $P(\text{symptoms} \mid H_1) = 0.1$ (heart attacks rarely sharp or worse with breathing)
- $P(\text{symptoms} \mid H_2) = 0.2$
- $P(\text{symptoms} \mid H_3) = 0.3$
- $P(\text{symptoms} \mid H_4) = 0.7$ (muscle strain often sharp, worse with movement)

**Posterior (unnormalized):**
- $H_1$: $0.1 \times 0.15 = 0.015$
- $H_2$: $0.2 \times 0.25 = 0.050$
- $H_3$: $0.3 \times 0.40 = 0.120$
- $H_4$: $0.7 \times 0.20 = 0.140$

**Normalized:**
- $P(H_1 \mid \text{symptoms}) = 0.015 / 0.325 = 0.046$ (5%)
- $P(H_2 \mid \text{symptoms}) = 0.050 / 0.325 = 0.154$ (15%)
- $P(H_3 \mid \text{symptoms}) = 0.120 / 0.325 = 0.369$ (37%)
- $P(H_4 \mid \text{symptoms}) = 0.140 / 0.325 = 0.431$ (43%)

Muscle strain is most likely (43%), but we haven't ruled out more serious conditions. An ECG could provide more evidence.

### Decision Making in Medicine

Medical decisions involve both probabilities and utilities (costs/benefits).

**Example:** Should we do invasive test?

**Options:**
- **Test:** Costs $1000, small risk of complications
- **No test:** Might miss disease

**Decision theory:**
- Compute expected utility of each action
- Account for test cost, treatment cost, health outcomes
- Choose action maximizing expected utility

**Bayesian framework:**
- Probability of disease given current information
- Expected value of information from the test
- Threshold probability for action (e.g., treat if P(disease) > 0.1)

### Why Bayesian Reasoning Matters

Medical errors often stem from ignoring base rates or misinterpreting test results.

**Common mistakes:**
1. **Ignoring base rate:** Focusing on test accuracy while ignoring disease prevalence
2. **Confusion of conditionals:** Thinking $P(\text{+} \mid D) = P(D \mid \text{+})$
3. **Overconfidence:** Assuming positive test means disease present

**Bayesian approach:**
- Forces explicit consideration of base rates
- Correctly combines all evidence
- Quantifies uncertainty
- Supports better decision-making

---

## Common Themes Across Applications

### 1. Explicit Probability

All three applications produce direct probability statements:
- "There's a 93% chance B is better than A"
- "This email is 67% likely to be ham"
- "Patient has 4.5% chance of disease given positive test"

### 2. Sequential Updating

Evidence accumulates naturally:
- A/B test: check results weekly, decide when confident
- Spam: update model as users mark emails
- Diagnosis: combine test results sequentially

### 3. Prior Knowledge

Domain expertise enters formally:
- A/B testing: previous conversion rates
- Spam: typical word frequencies
- Diagnosis: disease prevalence, symptom patterns

### 4. Decision Support

Probabilities inform actions:
- A/B testing: implement variant or keep testing
- Spam: filter email or request user feedback
- Diagnosis: order tests, start treatment, monitor

---

## Key Takeaways

- **A/B testing:** Bayesian approach enables sequential testing, probability statements about improvement, and expected value calculations

- **Spam filtering:** Naive Bayes classifier uses word frequencies and independence assumption to classify emails probabilistically

- **Medical diagnosis:** Bayes' theorem combines base rates, test accuracy, and symptoms to update disease probability

- **Base rates matter:** Low prevalence means even good tests produce many false positives

- **Sequential learning:** Posterior from one analysis becomes prior for next

- **Decision theory:** Combine probabilities with costs/benefits for optimal actions

- **Intuitive interpretation:** Direct probability statements support better decision-making than p-values or hard classifications

Bayesian methods transform abstract probability theory into practical tools for real-world decision-making, from product optimization to medical diagnosis. The coherent framework for updating beliefs in light of evidence makes Bayesian inference invaluable across countless applications.
