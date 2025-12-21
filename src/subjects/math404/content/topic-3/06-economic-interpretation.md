---
title: "Economic Interpretation of Duality"
description: "Shadow prices, marginal values, and economic insights from LP duality"
---

# Economic Interpretation of Duality

One of the most compelling reasons to study duality is not mathematical, but economic. The dual problem reveals the **implicit value of resources** in an optimization problem.

## The Production Problem

Consider a standard resource allocation problem (Primal):
- We manufacture $n$ products.
- We possess $m$ resources.
- $c_j$: Profit per unit of product $j$.
- $b_i$: Available amount of resource $i$.
- $a_{ij}$: Units of resource $i$ required to make one unit of product $j$.

**Primal (Maximize Profit):**
$$ \max \sum_{j=1}^n c_j x_j $$
$$ \text{s.t.} \sum_{j=1}^n a_{ij} x_j \leq b_i \quad \forall i $$
$$ x_j \geq 0 $$

## The Dual Problem

The dual variables $y_i$ correspond to the resources $b_i$.

**Dual (Minimize Valuation):**
$$ \min \sum_{i=1}^m b_i y_i $$
$$ \text{s.t.} \sum_{i=1}^m a_{ij} y_i \geq c_j \quad \forall j $$
$$ y_i \geq 0 $$

### Interpretation of Dual Variables ($y_i$)

The objective function $\sum b_i y_i$ suggests that $y_i$ represents a **unit value** or **price** associated with resource $i$. Since we want to minimize this total valuation, these are internal accounting prices, not market prices we pay.

These prices $y_i$ are called **shadow prices** or **marginal values**.

**Meaning:** $y_i$ is the rate of change of the optimal profit with respect to the availability of resource $i$.
$$ y_i = \frac{\partial z^*}{\partial b_i} $$

If we acquire one more unit of resource $i$ (change $b_i$ to $b_i + 1$), the maximum profit will increase by exactly $y_i$ (assuming the optimal basis doesn't change).

### Interpretation of Dual Constraints

Constraint $j$ in the dual is:
$$ \sum_{i=1}^m a_{ij} y_i \geq c_j $$

- LHS: $\sum a_{ij} y_i$. This is the **imputed cost** of producing one unit of product $j$. It sums the amount of each resource needed ($a_{ij}$) times the shadow price of that resource ($y_i$).
- RHS: $c_j$. This is the **market profit** from selling one unit of product $j$.

**The constraint says:**
*The value of the resources consumed to make a product must be at least as great as the profit from that product.*

Why?
- If $\text{Imputed Cost} < \text{Profit}$, then we are undervaluing our resources. We should produce more of product $j$, which would tighten the resource constraints and drive up the shadow prices $y_i$ until equality holds.
- If $\text{Imputed Cost} > \text{Profit}$, then the resources are worth more "sold" (or used elsewhere) than used to make this product. We should **not** produce product $j$.

This aligns perfectly with **Complementary Slackness**:
- If $\sum a_{ij} y_i > c_j$ (Cost > Profit), then $x_j = 0$ (Don't produce).
- If $x_j > 0$ (Produce), then $\sum a_{ij} y_i = c_j$ (Cost = Profit). Break-even analysis at the margin!

## Rent or Buy?

Imagine a competitor comes to you and offers to buy all your resources. What prices $y_i$ should they offer?

1.  **Offer must be attractive:** They must pay you enough so that for every product you *could* have made, the money they pay for the resources ($\sum a_{ij} y_i$) is at least the profit you would have made ($c_j$). Hence, $\sum a_{ij} y_i \geq c_j$.
2.  **Competitor wants a deal:** They want to minimize the total cost of buying your inventory: $\min \sum b_i y_i$.

The dual problem is exactly the problem of a competitor determining fair prices for your resources such that you have no incentive to produce anything yourself!

## Sensitivity Analysis

Shadow prices are critical for management decisions.

**Scenario:**
- Shadow price of Labor ($y_L$) = \$20/hour.
- Actual cost of overtime labor = \$30/hour.
- Should we hire overtime?

**Decision:**
Value generated (\$20) < Cost (\$30). **No.**

**Scenario:**
- Shadow price of Machine Time ($y_M$) = \$500/hour.
- Rental cost for extra machine = \$200/hour.
- Should we rent?

**Decision:**
Value generated (\$500) > Cost (\$200). **Yes!** Net gain of \$300/hour.

## Validity Ranges

The shadow price $y_i$ is a derivative. It is valid only locally.
If we increase resource $b_i$ significantly, we might hit a different vertex of the feasible region (change basis).
- The shadow price is constant within a specific range of $b_i$.
- Outside that range, the shadow price changes (usually decreases due to diminishing returns).

This piecewise linear, concave shape of the optimal value function $z^*(b)$ is a key property of linear programming.

## Summary

- **Primal**: Allocation of physical resources to maximize profit.
- **Dual**: Valuation of resources to minimize accounting cost.
- **Strong Duality**: At optimality, Total Resource Value = Total Profit.
- **Complementary Slackness**: Efficient activities break even; inefficient activities are not pursued. Valuable resources are fully utilized; surplus resources have zero marginal value.