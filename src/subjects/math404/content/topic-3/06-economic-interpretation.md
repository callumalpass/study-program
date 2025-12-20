---
title: "Economic Interpretation of Duality"
description: "Shadow prices, marginal values, and economic insights from LP duality"
---

# Economic Interpretation of Duality

## Shadow Prices

Dual variables $\pi_i$ are **shadow prices**: marginal value of resource $i$.

If resource $i$ increases by one unit, optimal value improves by $\pi_i$ (within validity range).

## Example: Production Planning

**Primal**: Maximize profit subject to resource constraints
- Variables: Production quantities
- Constraints: Resource availability

**Dual**: Minimize resource valuation
- Variables: Resource prices
- Constraints: Total cost of resources for each product $\geq$ profit

## Fair Pricing

Dual optimal solution gives "fair" prices for resources:
- Manufacturer indifferent between producing and selling resources
- Buyer indifferent between buying products and resources

## Python Example

```python
import numpy as np
import cvxpy as cp

# Products A, B with profits 40, 30
# Resources: Labor (100 hrs), Material (80 kg)
# Product A: 2 hrs labor, 1 kg material
# Product B: 1 hr labor, 2 kg material

# Primal: max profit
x = cp.Variable(2, nonneg=True)
profit = cp.Maximize(40*x[0] + 30*x[1])
resources = [2*x[0] + x[1] <= 100,  # Labor
             x[0] + 2*x[1] <= 80]    # Material
primal = cp.Problem(profit, resources)
primal.solve()

# Shadow prices (dual variables)
labor_price = resources[0].dual_value
material_price = resources[1].dual_value

print(f"Optimal production: A = {x.value[0]:.2f}, B = {x.value[1]:.2f}")
print(f"Maximum profit: ${profit.value:.2f}")
print(f"\nShadow prices:")
print(f"  Labor: ${labor_price:.2f} per hour")
print(f"  Material: ${material_price:.2f} per kg")
print(f"\nValue of resources:")
print(f"  100 hrs × ${labor_price:.2f} + 80 kg × ${material_price:.2f} = ${100*labor_price + 80*material_price:.2f}")
```
