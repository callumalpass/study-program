---
id: math202-t1-applications
title: "Applications of Probability"
order: 7
---

# Applications of Probability

## Introduction

Probability theory is not just an abstract mathematical framework—it has profound applications across many domains. This section explores how the fundamental concepts we've learned are applied in games of chance, genetics, reliability engineering, and risk assessment. These applications demonstrate the power and versatility of probabilistic reasoning in solving real-world problems.

## Applications in Games of Chance

### Lottery and Gambling

Games of chance provide clear applications of probability, particularly counting principles and the law of large numbers.

#### Example 1: Powerball Lottery

**Problem**: In Powerball, players select 5 numbers from 1-69 and 1 Powerball number from 1-26. What is the probability of:
(a) Winning the jackpot (matching all 5 + Powerball)?
(b) Matching exactly 5 numbers (but not the Powerball)?

**Solution**:

(a) Total possible tickets:
$$\binom{69}{5} \times 26 = \frac{69!}{5! \cdot 64!} \times 26 = 11,238,513 \times 26 = 292,201,338$$

Probability of jackpot:
$$P(\text{jackpot}) = \frac{1}{292,201,338} \approx 3.42 \times 10^{-9}$$

(b) Match 5 main numbers (1 way) and miss the Powerball (25 ways):
$$P(\text{match 5}) = \frac{1 \times 25}{292,201,338} = \frac{25}{292,201,338} \approx 8.56 \times 10^{-8}$$

#### Example 2: Expected Value in Roulette

**Problem**: In American roulette, a wheel has 38 slots (numbers 1-36, 0, and 00). Half of 1-36 are red, half are black, and 0 and 00 are green. If you bet $10 on red:
- Win: receive your $10 bet plus $10
- Lose: lose your $10 bet

What is the expected value?

**Solution**:
$$P(\text{red}) = \frac{18}{38}, \quad P(\text{not red}) = \frac{20}{38}$$

$$E[X] = (+10) \cdot \frac{18}{38} + (-10) \cdot \frac{20}{38} = 10 \left(\frac{18-20}{38}\right) = 10 \left(\frac{-2}{38}\right) \approx -\$0.53$$

On average, you lose about 53 cents per $10 bet. The house edge is $\frac{2}{38} \approx 5.26\%$.

### Card Games

#### Example 3: Poker Hands

**Problem**: What is the probability of being dealt a flush (5 cards of the same suit) in 5-card poker?

**Solution**:
Total 5-card hands: $\binom{52}{5} = 2,598,960$

For a flush:
- Choose the suit: 4 ways
- Choose 5 cards from that suit: $\binom{13}{5} = 1,287$ ways
- Total flushes: $4 \times 1,287 = 5,148$

But we must subtract straight flushes (10 per suit, including royal flush):
$$\text{Non-straight flushes} = 5,148 - 40 = 5,108$$

$$P(\text{flush}) = \frac{5,108}{2,598,960} \approx 0.00197 \approx 0.197\%$$

#### Example 4: Blackjack Probabilities

**Problem**: You're dealt an Ace (can count as 1 or 11) as your first card. What's the probability your next card gives you blackjack (21)?

**Solution**:
For blackjack, you need a 10, J, Q, or K.

Remaining cards: 51 (one Ace is gone)
Cards worth 10: $4 \times 4 - 0 = 16$ (assuming the Ace wasn't a 10-value card)

$$P(\text{blackjack}|A) = \frac{16}{51} \approx 0.314$$

About 31.4% chance.

## Applications in Genetics

### Mendelian Genetics

Probability is fundamental to understanding genetic inheritance.

#### Example 5: Punnett Squares

**Problem**: Two heterozygous parents (Aa genotype) for a trait have a child. The trait is dominant (A = dominant, a = recessive). What is the probability the child:
(a) Has genotype AA?
(b) Shows the dominant phenotype?

**Solution**:
Possible offspring genotypes: AA, Aa, aA, aa (equally likely)

(a) $P(AA) = \frac{1}{4} = 0.25$

(b) Dominant phenotype occurs with AA, Aa, or aA:
$$P(\text{dominant phenotype}) = P(AA) + P(Aa) + P(aA) = \frac{3}{4} = 0.75$$

This is the classic 3:1 Mendelian ratio.

#### Example 6: Sex-Linked Traits

**Problem**: Hemophilia is a sex-linked recessive trait on the X chromosome. A carrier mother (X^H X^h) and healthy father (X^H Y) have children. What is the probability:
(a) A son has hemophilia?
(b) A daughter is a carrier?

**Solution**:

Mother's X chromosomes: X^H (healthy), X^h (carrier)
Father's chromosomes: X^H, Y

Possible combinations:
- Daughters: X^H X^H (healthy), X^H X^h (carrier) - each 50%
- Sons: X^H Y (healthy), X^h Y (hemophilia) - each 50%

(a) $P(\text{son with hemophilia}) = \frac{1}{2} = 0.5$

(b) $P(\text{daughter is carrier}) = \frac{1}{2} = 0.5$

#### Example 7: Multiple Traits

**Problem**: Consider two independent traits:
- Trait 1: A (dominant), a (recessive) - parents both Aa
- Trait 2: B (dominant), b (recessive) - parents both Bb

What's the probability offspring shows both recessive phenotypes (aa and bb)?

**Solution**:
By independence:
$$P(aa \text{ and } bb) = P(aa) \times P(bb) = \frac{1}{4} \times \frac{1}{4} = \frac{1}{16}$$

This demonstrates the 9:3:3:1 ratio for dihybrid crosses.

## Applications in Reliability Engineering

### System Reliability

Probability theory is essential for analyzing the reliability of complex systems.

#### Example 8: Series Systems

**Problem**: A system has 4 components in series (all must work for the system to work). Each component has reliability 0.95 (works 95% of the time), independently. What is the system reliability?

**Solution**:
$$R_{\text{system}} = P(\text{all components work}) = (0.95)^4 \approx 0.8145$$

System reliability is about 81.45%. Note that series systems reduce overall reliability.

#### Example 9: Parallel Systems

**Problem**: A system has 3 redundant components in parallel (system works if at least one component works). Each has reliability 0.90, independently. What is the system reliability?

**Solution**:
$$R_{\text{system}} = 1 - P(\text{all fail}) = 1 - (0.10)^3 = 1 - 0.001 = 0.999$$

System reliability is 99.9%. Parallel redundancy greatly improves reliability.

#### Example 10: k-out-of-n Systems

**Problem**: A system has 5 components and works if at least 3 work (3-out-of-5 system). Each component has reliability 0.90, independently. What is the system reliability?

**Solution**:
System works if exactly 3, 4, or 5 components work:

$$R = \sum_{k=3}^{5} \binom{5}{k} (0.90)^k (0.10)^{5-k}$$

$$= \binom{5}{3}(0.90)^3(0.10)^2 + \binom{5}{4}(0.90)^4(0.10)^1 + \binom{5}{5}(0.90)^5(0.10)^0$$

$$= 10(0.729)(0.01) + 5(0.6561)(0.10) + 1(0.59049)(1)$$

$$= 0.0729 + 0.32805 + 0.59049 = 0.991$$

System reliability is about 99.1%.

### Fault Tree Analysis

#### Example 11: Complex System

**Problem**: A data center has:
- Two independent power supplies (each 98% reliable)
- Cooling system (95% reliable)
- Server hardware (99% reliable)

The system fails if power fails OR cooling fails OR hardware fails. What is the overall reliability?

**Solution**:

Power system (parallel): $R_{\text{power}} = 1 - (0.02)^2 = 0.9996$

Overall system (series):
$$R_{\text{system}} = R_{\text{power}} \times R_{\text{cooling}} \times R_{\text{hardware}}$$
$$= 0.9996 \times 0.95 \times 0.99 \approx 0.939$$

System reliability is about 93.9%.

## Applications in Risk Assessment

### Insurance and Actuarial Science

#### Example 12: Life Insurance Pricing

**Problem**: An insurance company offers a $100,000 one-year term life insurance policy to a 40-year-old. Mortality tables show the probability of death in one year is 0.002. What premium should be charged to break even (ignoring administrative costs)?

**Solution**:
Expected payout:
$$E[\text{payout}] = 100,000 \times 0.002 + 0 \times 0.998 = \$200$$

To break even, the premium should be at least $200.

In practice, companies add administrative costs and profit margin.

#### Example 13: Accident Insurance

**Problem**: An auto insurance company classifies drivers:
- Low risk (60% of drivers): 5% accident probability, average claim $3,000
- High risk (40% of drivers): 15% accident probability, average claim $5,000

What is the expected claim per driver?

**Solution**:
$$E[\text{claim}] = P(L) \cdot P(\text{accident}|L) \cdot E[\text{claim}|L] + P(H) \cdot P(\text{accident}|H) \cdot E[\text{claim}|H]$$

$$= 0.60 \times 0.05 \times 3000 + 0.40 \times 0.15 \times 5000$$

$$= 90 + 300 = \$390$$

### Medical Risk Assessment

#### Example 14: Treatment Decisions

**Problem**: A patient has a condition that is fatal without surgery. Consider two options:
- Option A: Surgery with 95% survival rate
- Option B: Medication with 70% cure rate; if unsuccessful, emergency surgery required (85% survival rate)

Which option has higher survival probability?

**Solution**:

Option A: $P(\text{survive}_A) = 0.95$

Option B:
$$P(\text{survive}_B) = P(\text{cure}) + P(\text{not cure}) \cdot P(\text{survive surgery})$$
$$= 0.70 + 0.30 \times 0.85 = 0.70 + 0.255 = 0.955$$

Option B has slightly higher survival probability (95.5% vs 95%).

### Environmental Risk

#### Example 15: Flood Risk

**Problem**: A region has a 2% annual probability of flooding. What is the probability of:
(a) No floods in the next 10 years?
(b) At least one flood in the next 10 years?

**Solution**:
Assuming independence between years:

(a) $P(\text{no flood in 10 years}) = (0.98)^{10} \approx 0.817$

(b) $P(\text{at least one flood}) = 1 - 0.817 = 0.183$

About 18.3% chance of at least one flood in 10 years.

This is relevant for "100-year flood" terminology: a 1% annual flood has about 63.4% probability of occurring at least once in 100 years, not certainty.

### Financial Risk

#### Example 16: Investment Portfolio

**Problem**: An investor holds two stocks:
- Stock A: 60% of portfolio, 70% probability of gain, expected return +15%
- Stock B: 40% of portfolio, 50% probability of gain, expected return +25%

Assuming independence, what's the probability both stocks gain?

**Solution**:
$$P(\text{both gain}) = P(A \text{ gains}) \times P(B \text{ gains}) = 0.70 \times 0.50 = 0.35$$

35% probability both stocks gain.

Note: In reality, stock returns are often correlated, violating independence.

#### Example 17: Credit Default

**Problem**: A bank has 100 loans, each with 2% independent default probability. What is the probability of:
(a) No defaults?
(b) More than 5 defaults?

**Solution**:

(a) $P(\text{0 defaults}) = (0.98)^{100} \approx 0.133$

(b) For more than 5 defaults, we'd use the binomial distribution (covered in later topics):
$$P(X > 5) = 1 - \sum_{k=0}^{5} \binom{100}{k}(0.02)^k(0.98)^{100-k} \approx 0.017$$

About 1.7% probability of more than 5 defaults.

## Worked Problem: Diagnostic Testing Chain

**Problem**: A patient undergoes a sequence of tests for a rare disease (1% prevalence):

Test 1: Sensitivity 90%, Specificity 95%
Test 2 (given if Test 1 is positive): Sensitivity 95%, Specificity 98%

(a) What's the probability both tests are positive?
(b) If both tests are positive, what's the probability the patient has the disease?

**Solution**:

(a) Using the law of total probability:
$$P(T_1^+ \cap T_2^+) = P(D) \cdot P(T_1^+|D) \cdot P(T_2^+|D) + P(D^c) \cdot P(T_1^+|D^c) \cdot P(T_2^+|D^c)$$
$$= 0.01 \times 0.90 \times 0.95 + 0.99 \times 0.05 \times 0.02$$
$$= 0.00855 + 0.00099 = 0.00954$$

About 0.954% probability both tests are positive.

(b) Using Bayes' theorem:
$$P(D|T_1^+ \cap T_2^+) = \frac{P(D) \cdot P(T_1^+|D) \cdot P(T_2^+|D)}{P(T_1^+ \cap T_2^+)}$$
$$= \frac{0.01 \times 0.90 \times 0.95}{0.00954} = \frac{0.00855}{0.00954} \approx 0.896$$

If both tests are positive, there's about 89.6% probability the patient has the disease—much higher than after just one positive test (recall Example 1 from Bayes' Theorem section: ~8.76%).

## Summary

Probability has wide-ranging applications:

**Games of Chance**: Computing odds, expected values, and house edges
**Genetics**: Predicting inheritance patterns and genetic risk
**Reliability**: Designing robust systems with redundancy
**Risk Assessment**: Insurance pricing, medical decisions, environmental planning, financial analysis

These applications demonstrate that probability is not merely theoretical—it's an essential tool for quantifying uncertainty and making informed decisions across virtually every field of human endeavor.
