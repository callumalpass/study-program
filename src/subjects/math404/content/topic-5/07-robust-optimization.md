---
title: "Robust Optimization"
description: "Optimization under uncertainty"
---

# Robust Optimization

Standard optimization assumes the data $(A, b, c)$ is known exactly. In the real world, data is noisy, estimated, or uncertain. **Robust Optimization** seeks a solution that remains feasible and near-optimal even when the data changes within a specified **uncertainty set**.

## The Core Idea

Consider a constraint $a^T x 

$
Suppose $a$ is uncertain and lies in a set $

$
We want the constraint to hold for **all** $a 

$
$$ orall a 


This is equivalent to:
$$ 


The nature of the resulting "robust counterpart" depends on the geometry of $

$

## Box Uncertainty (Intervals)

Suppose each $a_i 

$
This is a box (hyper-rectangle).
$$ 

To maximize $a_i x_i$:
- If $x_i 

$, choose $a_i = 

$
- If $x_i < 0$, choose $a_i = 

$
So $

$

**Robust Constraint:**
$$ 

This is an **LP** (using variables for $|x_i|$).

**Pros:** Simple.
**Cons:** Very conservative. It assumes the "Worst Case" happens for *every* parameter simultaneously (Murphy's Law on steroids).

## Ellipsoidal Uncertainty

Suppose $a$ lies in an ellipsoid centered at $

$
$$ 

This models correlations between uncertainties.

**Derivation:**
$$ 

By Cauchy-Schwarz, the max is $

$

**Robust Constraint:**
$$ 

This is a **Second-Order Cone (SOC)** constraint.

**Result:** The robust counterpart of an LP with ellipsoidal uncertainty is an SOCP.
This gives a deeper reason for studying SOCPs!

## Polyhedral Uncertainty

Suppose $a$ lies in a polyhedron defined by $Da 

$
$$ 

We can use **Duality** to convert this inner maximization into a minimization.
Let the dual variables for the inner problem be $y$.
$$ 


Substitute back into the main problem:
$$ 


**Result:** The robust counterpart of an LP with polyhedral uncertainty is a larger **LP**.

## Example: Robust Portfolio

Standard Markowitz minimizes variance $

$
This assumes $

$
Estimation errors in $

$

**Robust formulation:** Minimize the worst-case variance over a set of possible covariance matrices.
Often leads to SDPs.

## Chance Constraints

Alternative view: We want the constraint to hold with high probability.
$$ 

If $a$ is Gaussian $N(

$
$a^T x$ is Gaussian $N(

$
Constraint becomes:
$$ 

$$ 

This is exactly an **SOCP constraint** (same form as Ellipsoidal)!
This establishes a beautiful link between Stochastic Programming (Gaussian) and Robust Optimization (Ellipsoidal).

## Summary

- **Ignore uncertainty:** Solution might be infeasible 50% of the time.
- **Box uncertainty:** Solution is safe but extremely costly (too conservative).
- **Ellipsoidal uncertainty:** Solution balances safety and cost; leads to SOCP.
- **Robust Optimization** converts "uncertain LP" into "certain SOCP/SDP".