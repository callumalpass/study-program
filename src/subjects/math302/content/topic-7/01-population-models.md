---
title: "Population Models"
---

# Population Models

## Introduction

Differential equations provide powerful tools for modeling population dynamics in biology, ecology, and environmental science. From simple exponential growth to complex predator-prey interactions, these models help us understand and predict how populations change over time and interact with their environment and each other.

## Exponential Growth Model

### The Malthusian Model

The simplest population model assumes that the rate of population growth is proportional to the current population:

$$\frac{dP}{dt} = kP$$

where:
- $P(t)$ is the population at time $t$
- $k$ is the growth rate constant (birth rate minus death rate)

### Solution

This is a separable equation:

$$\frac{dP}{P} = k \, dt$$

Integrating:

$$\ln|P| = kt + C$$

$$P(t) = P_0 e^{kt}$$

where $P_0 = P(0)$ is the initial population.

### Characteristics

- **$k > 0$**: Exponential growth (population increases indefinitely)
- **$k < 0$**: Exponential decay (population approaches extinction)
- **Doubling time** (when $k > 0$): $T_d = \frac{\ln 2}{k}$
- **Half-life** (when $k < 0$): $T_h = \frac{\ln 2}{|k|}$

```plot
{
  "title": "Exponential Growth vs Decay",
  "xAxis": { "domain": [0, 5], "label": "t" },
  "yAxis": { "domain": [0, 8], "label": "P(t)" },
  "data": [
    { "fn": "exp(0.5*x)", "color": "#22c55e", "title": "Growth: P₀e^(0.5t)" },
    { "fn": "5*exp(-0.5*x)", "color": "#ef4444", "title": "Decay: 5e^(-0.5t)" }
  ]
}
```

### Limitations

The exponential model is unrealistic for long-term prediction because:
- Assumes unlimited resources
- Ignores environmental capacity
- No competition or predation effects
- Valid only for short time periods or unconstrained environments

## Logistic Growth Model

### The Verhulst Model

Pierre-François Verhulst introduced a more realistic model that accounts for limited resources:

$$\frac{dP}{dt} = kP\left(1 - \frac{P}{K}\right)$$

where:
- $k$ is the intrinsic growth rate
- $K$ is the **carrying capacity** (maximum sustainable population)

The factor $(1 - P/K)$ represents environmental resistance.

### Solution

This is a separable Bernoulli equation:

$$\frac{dP}{P(1-P/K)} = k \, dt$$

Using partial fractions:

$$\frac{1}{P} + \frac{1/K}{1-P/K} = \frac{1}{P(1-P/K)}$$

Integrating:

$$\ln|P| - \ln|K-P| = kt + C$$

$$\ln\left|\frac{P}{K-P}\right| = kt + C$$

Solving for $P$:

$$P(t) = \frac{K}{1 + Ae^{-kt}}$$

where $A = \frac{K-P_0}{P_0}$ and $P_0 = P(0)$.

Alternatively:

$$P(t) = \frac{KP_0}{P_0 + (K-P_0)e^{-kt}}$$

### Characteristics

1. **Initial growth**: When $P \ll K$, the model approximates exponential growth
2. **Saturation**: As $P \to K$, growth slows to zero
3. **S-shaped curve**: The solution is a sigmoid (S-curve)
4. **Equilibria**:
   - $P = 0$ (unstable)
   - $P = K$ (stable)
5. **Inflection point**: At $P = K/2$, where growth rate is maximum

The logistic solution produces the characteristic S-shaped (sigmoid) curve:

```plot
{
  "title": "Logistic Growth: S-Curve Approaching Carrying Capacity",
  "xAxis": { "domain": [0, 10], "label": "t" },
  "yAxis": { "domain": [0, 110], "label": "P(t)" },
  "data": [
    { "fn": "100/(1+9*exp(-x))", "color": "#8b5cf6", "title": "Logistic (K=100, P₀=10)" },
    { "fn": "10*exp(x)", "color": "#22c55e", "title": "Exponential (unlimited)" },
    { "fn": "100", "color": "#94a3b8", "title": "Carrying capacity K" },
    { "fn": "50", "color": "#cbd5e1", "title": "Inflection point K/2" }
  ]
}
```

### Phase Portrait

The phase line shows:

$$\frac{dP}{dt} = kP(1-P/K) \begin{cases} > 0 & 0 < P < K \\ = 0 & P = 0, K \\ < 0 & P > K \end{cases}$$

All solutions with $P_0 > 0$ approach $K$ as $t \to \infty$.

### Example: Bacterial Growth

A bacterial culture has initial population 1000 and grows logistically with $k = 0.5$ per hour and carrying capacity $K = 10000$.

$$P(t) = \frac{10000 \cdot 1000}{1000 + 9000e^{-0.5t}} = \frac{10^7}{1000 + 9000e^{-0.5t}}$$

Time to reach half capacity:

$$5000 = \frac{10^7}{1000 + 9000e^{-0.5t}}$$

$$1000 + 9000e^{-0.5t} = 2000$$

$$e^{-0.5t} = \frac{1}{9}$$

$$t = 2\ln(9) \approx 4.39 \text{ hours}$$

## Harvesting Models

### Constant Harvesting

$$\frac{dP}{dt} = kP\left(1 - \frac{P}{K}\right) - h$$

where $h$ is the constant harvest rate.

**Equilibria**: Solve $kP(1-P/K) - h = 0$:

$$P^* = \frac{K}{2} \pm \frac{K}{2}\sqrt{1 - \frac{4h}{kK}}$$

- If $h < \frac{kK}{4}$: Two equilibria (one stable, one unstable)
- If $h = \frac{kK}{4}$: One equilibrium (critical harvesting)
- If $h > \frac{kK}{4}$: No equilibrium (population collapses)

**Maximum sustainable yield**: $h_{max} = \frac{kK}{4}$ at $P^* = K/2$

### Proportional Harvesting

$$\frac{dP}{dt} = kP\left(1 - \frac{P}{K}\right) - hP = P[(k-h) - \frac{k}{K}P]$$

This modifies the growth rate to $(k-h)$ and preserves the logistic form.

Equilibrium: $P^* = K\left(1 - \frac{h}{k}\right)$ (stable if $h < k$)

## Predator-Prey Models

### Lotka-Volterra Model

The classic predator-prey model describes two interacting species:

$$\frac{dx}{dt} = ax - bxy$$

$$\frac{dy}{dt} = -cy + dxy$$

where:
- $x(t)$ is prey population
- $y(t)$ is predator population
- $a$ is prey birth rate
- $b$ is predation rate
- $c$ is predator death rate
- $d$ is efficiency of converting prey to predators

### Equilibria

Setting both derivatives to zero:

1. **Extinction**: $(0, 0)$ (unstable)
2. **Coexistence**: $\left(\frac{c}{d}, \frac{a}{b}\right)$ (center - neutral stability)

### Behavior

The system exhibits periodic oscillations around the coexistence equilibrium. Both populations cycle with:

- Predators lag behind prey
- Oscillation amplitude depends on initial conditions
- Populations never reach equilibrium (except exactly at the equilibrium point)

### Phase Portrait

The system has closed orbits (cycles) around $\left(\frac{c}{d}, \frac{a}{b}\right)$.

**First integral** (conserved quantity):

$$V(x,y) = dx - c\ln x + by - a\ln y = \text{constant}$$

### Example

With $a = 0.5, b = 0.01, c = 0.2, d = 0.005$:

Equilibrium: $(40, 50)$

Starting near $(50, 40)$, the populations oscillate periodically.

### Modified Lotka-Volterra with Logistic Prey

A more realistic model includes prey carrying capacity:

$$\frac{dx}{dt} = ax\left(1-\frac{x}{K}\right) - bxy$$

$$\frac{dy}{dt} = -cy + dxy$$

This produces a stable spiral equilibrium where populations converge to a steady state rather than cycling indefinitely.

## Competition Models

### Two-Species Competition

$$\frac{dx}{dt} = r_1 x\left(1 - \frac{x + \alpha y}{K_1}\right)$$

$$\frac{dy}{dt} = r_2 y\left(1 - \frac{y + \beta x}{K_2}\right)$$

where:
- $x, y$ are the two species
- $K_1, K_2$ are carrying capacities
- $\alpha$ measures effect of species 2 on species 1
- $\beta$ measures effect of species 1 on species 2

### Outcomes

Depending on $\alpha, \beta, K_1, K_2$:

1. **Competitive exclusion**: One species drives the other to extinction
2. **Coexistence**: Both species survive at stable equilibrium
3. **Bistability**: Outcome depends on initial conditions

**Coexistence condition**: Both of the following must hold:

$$\alpha < \frac{K_1}{K_2}, \quad \beta < \frac{K_2}{K_1}$$

## Allee Effect

At very low populations, the per capita growth rate may decrease (difficulty finding mates, etc.):

$$\frac{dP}{dt} = kP\left(1 - \frac{P}{K}\right)\left(\frac{P}{A} - 1\right)$$

where $A$ is the **Allee threshold**.

**Equilibria**:
- $P = 0$ (stable - extinction attractor)
- $P = A$ (unstable threshold)
- $P = K$ (stable - survival)

Populations below $A$ go extinct; above $A$, they grow toward $K$.

The Allee effect creates two stable attractors (extinction and carrying capacity) with an unstable threshold:

```plot
{
  "title": "Allee Effect: Growth Rate dP/dt vs Population P",
  "xAxis": { "domain": [0, 1.1], "label": "P/K (normalized)" },
  "yAxis": { "domain": [-0.15, 0.15], "label": "dP/dt" },
  "data": [
    { "fn": "x*(1-x)*(x-0.2)", "color": "#dc2626", "title": "Allee effect (A=0.2K)" },
    { "fn": "0.3*x*(1-x)", "color": "#22c55e", "title": "Standard logistic (no Allee)" },
    { "fn": "0", "color": "#94a3b8", "title": "Equilibrium line" }
  ]
}
```

## Summary of Models

| Model | Equation | Key Feature |
|-------|----------|-------------|
| Exponential | $\frac{dP}{dt} = kP$ | Unlimited growth |
| Logistic | $\frac{dP}{dt} = kP(1-P/K)$ | Carrying capacity |
| Harvested Logistic | $\frac{dP}{dt} = kP(1-P/K) - h$ | Sustainable yield |
| Lotka-Volterra | $\frac{dx}{dt} = ax - bxy$, $\frac{dy}{dt} = -cy + dxy$ | Predator-prey cycles |
| Competition | $\frac{dx}{dt} = r_1x(1-(x+\alpha y)/K_1)$ | Interspecific competition |
| Allee Effect | $\frac{dP}{dt} = kP(1-P/K)(P/A-1)$ | Critical threshold |

Population models demonstrate how differential equations capture essential biological mechanisms and predict long-term dynamics, from simple growth to complex ecological interactions.
