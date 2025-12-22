---
id: math203-t5-business
title: "Business and Economic Optimization"
order: 6
---

# Business and Economic Optimization

Calculus is an essential tool in economics and business. This section explores optimization problems involving cost, revenue, and profit, where derivatives help companies make optimal decisions about pricing, production, and resource allocation.

## Economic Functions

### Cost Function $C(x)$

The **total cost** $C(x)$ represents the cost to produce $x$ units. It typically includes:

- **Fixed costs:** Rent, equipment, salaries—independent of production level
- **Variable costs:** Materials, labor per unit—depend on production level

**Common form:** $C(x) = \text{Fixed} + \text{Variable} \cdot x$

More realistically, variable costs per unit may change with scale:
$$C(x) = F + ax + bx^2$$

where the $bx^2$ term captures increasing costs at high production (overtime, equipment wear, etc.).

### Revenue Function $R(x)$

**Revenue** is income from sales: $R(x) = p \cdot x$ where $p$ is price per unit.

When price depends on quantity (demand curve): $p = D(x)$
$$R(x) = x \cdot D(x)$$

**Example:** If $p = 100 - 2x$ (price decreases as supply increases):
$$R(x) = x(100 - 2x) = 100x - 2x^2$$

### Profit Function $P(x)$

**Profit** is revenue minus cost:
$$P(x) = R(x) - C(x)$$

A company wants to maximize profit.

## Marginal Analysis

The **marginal** cost, revenue, or profit is the derivative—the rate of change per additional unit.

| Function | Marginal | Interpretation |
|----------|----------|----------------|
| $C(x)$ | $C'(x)$ | Cost of producing one more unit |
| $R(x)$ | $R'(x)$ | Revenue from selling one more unit |
| $P(x)$ | $P'(x)$ | Profit from producing one more unit |

### Key Insight: Profit Maximization

At maximum profit: $P'(x) = 0$

Since $P(x) = R(x) - C(x)$:
$$P'(x) = R'(x) - C'(x) = 0$$
$$R'(x) = C'(x)$$

**Profit is maximized when marginal revenue equals marginal cost.**

This makes intuitive sense: keep producing as long as each additional unit brings in more revenue than it costs. Stop when the next unit would cost more than it earns.

## Example 1: Basic Profit Maximization

A company has cost function $C(x) = 500 + 10x + 0.01x^2$ and sells at a fixed price of $25 per unit.

**Revenue:** $R(x) = 25x$

**Profit:** $P(x) = 25x - (500 + 10x + 0.01x^2) = -500 + 15x - 0.01x^2$

**Maximize:**
$$P'(x) = 15 - 0.02x = 0$$
$$x = 750 \text{ units}$$

**Verify maximum:** $P''(x) = -0.02 < 0$ (concave down, so maximum)

**Maximum profit:** $P(750) = -500 + 15(750) - 0.01(562500) = -500 + 11250 - 5625 = 5125$

Or using marginal analysis:
$R'(x) = 25$ and $C'(x) = 10 + 0.02x$

Set equal: $25 = 10 + 0.02x \Rightarrow x = 750$ ✓

## Example 2: Price-Dependent Demand

A company finds that if they price their product at $p$ dollars, they sell $x = 1000 - 10p$ units.

Solving for $p$: $p = 100 - 0.1x$

**Revenue:** $R(x) = x \cdot p = x(100 - 0.1x) = 100x - 0.1x^2$

**Cost:** $C(x) = 2000 + 20x$

**Profit:** $P(x) = 100x - 0.1x^2 - 2000 - 20x = -2000 + 80x - 0.1x^2$

**Maximize:**
$$P'(x) = 80 - 0.2x = 0$$
$$x = 400 \text{ units}$$

**Optimal price:** $p = 100 - 0.1(400) = 60$ dollars

**Maximum profit:** $P(400) = -2000 + 80(400) - 0.1(160000) = -2000 + 32000 - 16000 = 14000$

## Example 3: Minimizing Average Cost

The **average cost** is cost per unit: $\bar{C}(x) = \frac{C(x)}{x}$

**Problem:** Minimize average cost for $C(x) = 2000 + 10x + 0.02x^2$

$$\bar{C}(x) = \frac{2000}{x} + 10 + 0.02x$$

**Minimize:**
$$\bar{C}'(x) = -\frac{2000}{x^2} + 0.02 = 0$$
$$\frac{2000}{x^2} = 0.02$$
$$x^2 = 100000$$
$$x = \sqrt{100000} \approx 316.2 \text{ units}$$

**Verify minimum:** $\bar{C}''(x) = \frac{4000}{x^3} > 0$ for $x > 0$ ✓

**Minimum average cost:** $\bar{C}(316.2) \approx 22.65$ dollars per unit

### Important Result

At the minimum of average cost:
$$\bar{C}'(x) = 0 \Rightarrow \frac{xC'(x) - C(x)}{x^2} = 0 \Rightarrow C'(x) = \frac{C(x)}{x} = \bar{C}(x)$$

**Average cost is minimized when marginal cost equals average cost.**

## Example 4: Elasticity of Demand

**Price elasticity of demand** measures responsiveness of demand to price changes:

$$\epsilon = \frac{p}{x} \cdot \frac{dx}{dp} = \frac{\text{Percentage change in quantity}}{\text{Percentage change in price}}$$

- $|\epsilon| > 1$: Elastic (demand sensitive to price)
- $|\epsilon| < 1$: Inelastic (demand insensitive to price)
- $|\epsilon| = 1$: Unit elastic

**Revenue optimization using elasticity:**

$$R = px$$
$$\frac{dR}{dp} = x + p\frac{dx}{dp} = x\left(1 + \frac{p}{x}\frac{dx}{dp}\right) = x(1 + \epsilon)$$

Since $\epsilon < 0$ (demand decreases as price increases):
- If $|\epsilon| > 1$: $\frac{dR}{dp} < 0$ (raise price → less revenue)
- If $|\epsilon| < 1$: $\frac{dR}{dp} > 0$ (raise price → more revenue)

Revenue is maximized when $|\epsilon| = 1$.

## Example 5: Inventory Optimization

The **Economic Order Quantity (EOQ)** model minimizes total inventory cost.

**Setup:**
- Annual demand: $D$ units
- Cost per order: $K$ (fixed cost for placing an order)
- Holding cost: $h$ per unit per year

If you order $Q$ units at a time:
- Number of orders per year: $\frac{D}{Q}$
- Average inventory: $\frac{Q}{2}$

**Total annual cost:**
$$TC(Q) = K \cdot \frac{D}{Q} + h \cdot \frac{Q}{2} = \frac{KD}{Q} + \frac{hQ}{2}$$

**Minimize:**
$$TC'(Q) = -\frac{KD}{Q^2} + \frac{h}{2} = 0$$
$$Q^2 = \frac{2KD}{h}$$
$$Q^* = \sqrt{\frac{2KD}{h}}$$

This is the **Economic Order Quantity** formula, widely used in operations management.

## Decision Rules Summary

| Objective | Condition |
|-----------|-----------|
| Maximize profit | $R'(x) = C'(x)$ (MR = MC) |
| Minimize average cost | $C'(x) = \bar{C}(x)$ (MC = AC) |
| Maximize revenue | $R'(x) = 0$ or $|\epsilon| = 1$ |
| Break-even point | $R(x) = C(x)$ |

## Common Mistakes

1. **Confusing total and marginal:**
   Maximum profit occurs where $P'(x) = 0$, not where $P(x)$ is largest among a few tested points.

2. **Ignoring constraints:**
   Production quantity $x$ must be non-negative, and there may be capacity limits.

3. **Using wrong demand relationship:**
   Carefully distinguish whether price is given as a function of quantity or quantity as a function of price.

## Summary

- Profit = Revenue - Cost; maximize by setting $P'(x) = 0$
- Profit is maximized when marginal revenue equals marginal cost
- Average cost is minimized when marginal cost equals average cost
- Elasticity determines whether raising prices increases or decreases revenue
- EOQ formula minimizes inventory costs
- Always verify second-order conditions (second derivative test)
- Real constraints (non-negative production, capacity limits) must be considered
